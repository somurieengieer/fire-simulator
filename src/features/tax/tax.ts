// 所得に関するロジック

// 所得と控除のセット（Redux保存用クラス）
import {Deduction, Income, TaxSet} from "./taxSlice";

export interface InnerTaxSet {
  incomes: InnerIncome[],
  deductions: InnerEditableDeduction[], //控除
  calculatedDeductions: InnerAutoCalculatedDeduction[], //控除（自動導出）
}

// 所得
export interface InnerIncome {
  name: string,
  amount: number,
  deductions: InnerEditableDeduction[], //控除
  calculatedDeductions: InnerAutoCalculatedDeduction[], //控除（自動導出）
}


// 控除
export interface InnerDeduction {
  name: string,
  amount?: number | string,
}

// 編集可能控除
export interface InnerEditableDeduction extends InnerDeduction {
  editable: boolean,
  checkBox?: boolean,
  checked?: boolean,
}

// 自動算出控除
interface InnerAutoCalculatedDeduction extends InnerDeduction {
  calcAmount: (amount: number) => number
}

// 課税標準（課税対象となる所得の合計）
interface BaseOfTaxation {
  amount: number,
}

// 累進控除
interface ProgressiveRateItem {
  min: number,
  max: number,
  rate: number,
  base: number,
}
// 累進金額の計算クラス（給与所得控除額計算など）
function calcProgressiveRate(amount: number, items: ProgressiveRateItem[]): number {
  const item = items.find(i => i.min < amount && amount <= i.max) as ProgressiveRateItem
  return amount * item.rate + item.base
}

// 給与所得控除
const salaryDeductionProgressiveRate = (amount: number) => {
  const items = [
    [-1, 180, 0.4, 0],
    [180, 360, 0.3, 18],
    [360, 660, 0.2, 54],
    [660, 1000, 0.1, 120],
    [1000, 9999999999, 0.05, 170],
  ].map(i => {return {min: i[0], max: i[1], rate: i[2], base: i[3]}})
  const result = calcProgressiveRate(amount, items)

  // 限度額の補正
  if (result < 65) return Math.min(amount, 65)
  if (result > 230) return 230
  return result
}

// 給与所得
const salaryIncome = (): InnerIncome => {
  return {
    name: '給与所得',
    amount: 0,
    deductions: [],
    calculatedDeductions: [{
      name: '給与所得控除',
      calcAmount: (amount: number): number =>
        salaryDeductionProgressiveRate(amount || 0)
    }
    ]
  }
}

// 事業所得
const soleProprietorIncome = (): InnerIncome => {
  return {
    name: '事業所得',
    amount: 0,
    deductions: [{
      name: '青色申告特別控除',
      amount: 65,
      editable: false,
      checkBox: true,
      checked: true,
    },
    {
      name: '経費',
      amount: 0,
      editable: true,
    }],
    calculatedDeductions: []
  }
}


// 所得控除
export const commonDeductions = (): InnerEditableDeduction[] => {
  return [{name: '医療費控除',
    amount: 0,
    editable: true}
    ]
}
export const commonCalculatedDeductions = (): InnerAutoCalculatedDeduction[] => {
  return [{name: '基礎控除',
    calcAmount: (totalIncome: number): number => {
      if (totalIncome <= 2400) return 48
      if (totalIncome <= 2450) return 32
      if (totalIncome <= 2500) return 16
      return 0
    },
  }]
}


export const defaultIncomeAndDeductionSet = (): InnerTaxSet => {
  return {
    incomes: [
      salaryIncome(),
      soleProprietorIncome(),
    ],
    deductions: commonDeductions(),
    calculatedDeductions: commonCalculatedDeductions(),
  }
}

export function taxSetConvert(taxSet: TaxSet): TaxSet {
  const innerSet = defaultIncomeAndDeductionSet()
  innerSet.incomes.forEach(innerIncome => {
    const income = taxSet.incomes.find(i => i.name === innerIncome.name) as Income
    innerIncome.calculatedDeductions.map(innerDed => {
      const ded = income.deductions.find(d => d.name === innerDed.name) as Deduction
      ded.amount = innerDed.calcAmount(income.amount)
    })
  })
  // 課税標準
  taxSet.baseOfTaxation = taxSet.incomes
    .map(income => Math.max(
      income.amount
        - (income.deductions.map(ded => Number(ded.amount || 0))
          .reduce((a, b) => a + b) || 0),
      0)
    ).reduce((a, b) => a + b)

  innerSet.calculatedDeductions.forEach(innerDed => {
    const ded = taxSet.deductions.find(d => d.name === innerDed.name) as Deduction
    ded.amount = innerDed.calcAmount(taxSet.baseOfTaxation)
  })
  return taxSet
}
