// 所得に関するロジック

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
    [0, 180, 0.4, 0],
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

// 所得
export interface Tax {
  name: string,
  incomeDeductions: IncomeDeduction[],
  amount?: number,
}

// 全所得の合算
interface Incomes {

}

// 控除
export interface Deduction {
  name: string,
  amount?: number,
}

// 所得控除
interface IncomeDeduction extends Deduction {
  calcAmount: (income: Tax) => number
}

export const incomes = (): Tax[] => {
  return [{name: '給与所得',
    incomeDeductions: [{
      name: '給与所得控除',
      calcAmount: (income: Tax): number =>
        salaryDeductionProgressiveRate(income.amount || 0)
    }
    ]
  }]
}

export interface commonDeduction extends Deduction {
  editable: boolean,
  calcAmount: (totalIncome: number) => number, // 総所得金額
}

export const commonDeductions = (): commonDeduction[] => {
  return [{name: '基礎控除',
    calcAmount: (totalIncome: number): number => {
      if (totalIncome <= 2400) return 48
      if (totalIncome <= 2450) return 32
      if (totalIncome <= 2500) return 16
      return 0
    },
    editable: false }]
}

