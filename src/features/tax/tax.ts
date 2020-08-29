// 所得に関するロジック

// 所得と控除のセット（Redux保存用クラス）
import {Deduction, Income, ShowableItem, SocialInsurance, TaxSet} from "./taxSlice";
import {manYen, sumAmount} from "../utils/Utils";
import {retirementTaxConvert} from "./retirementTax";
import {calcAnnuity, updateForAnnuity} from "../annuity/annuity";

export interface InnerTaxSet {
  incomes: InnerIncome[],
  deductions: InnerEditableDeduction[], //控除
  calculatedDeductions: InnerAutoCalculatedItem [], //控除（自動導出）
  socialInsurance: InnerAutoCalculatedItem[], // 社会保険料
  personalTax: InnerAutoCalculatedItem[], // 税金
  retirementAnnuity: InnerAutoCalculatedItem, // 年金試算
  furusato: InnerAutoCalculatedItem, // ふるさと納税
}

// 所得
export interface InnerIncome {
  subHeaderTitle: string,
  name: string,
  amount: number,
  deductions: InnerEditableDeduction[], //控除
  calculatedDeductions: InnerAutoCalculatedIncomeDeduction[], //控除（自動導出）
}


// 画面で表示可能な項目
export interface InnerShowableItem {
  name: string,
  amount?: number | string,
  availableCheckBox?: boolean,
  checked?: boolean,
  toolTip?: string,
}

// 編集可能控除
export interface InnerEditableDeduction extends InnerShowableItem {
  editable: boolean,
}

interface InnerAutoCalculable<T> extends InnerShowableItem {
  calcAmount: (t: T) => number
}
// 自動算出控除（所得専用）
interface InnerAutoCalculatedIncomeDeduction extends InnerAutoCalculable<Income> {
}
// 自動算出（その他用）
interface InnerAutoCalculatedItem extends InnerAutoCalculable<TaxSet> {
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

// TODO: 厳密には賞与の繰入上限がある（年間573万）
// 社会保険料
// 令和２年４月〜　東京
const socialInsurance = (standardSalaryByMonth: number): any => {
  const data = [
    [1,58000,0,63000,5724.6,2862.3,6762.8,3381.4,16104.00,8052.00],
    [2,68000,63000,73000,6711.6,3355.8,7928.8,3964.4,16104.00,8052.00],
    [3,78000,73000,83000,7698.6,3849.3,9094.8,4547.4,16104.00,8052.00],
    [4,88000,83000,93000,8685.6,4342.8,10260.8,5130.4,16104.00,8052.00],
    [5,98000,93000,101000,9672.6,4836.3,11426.8,5713.4,17934.00,8967.00],
    [6,104000,101000,107000,10264.8,5132.4,12126.4,6063.2,19032.00,9516.00],
    [7,110000,107000,114000,10857.0,5428.5,12826.0,6413.0,20130.00,10065.00],
    [8,118000,114000,122000,11646.6,5823.3,13758.8,6879.4,21594.00,10797.00],
    [9,126000,122000,130000,12436.2,6218.1,14691.6,7345.8,23058.00,11529.00],
    [10,134000,130000,138000,13225.8,6612.9,15624.4,7812.2,24522.00,12261.00],
    [11,142000,138000,146000,14015.4,7007.7,16557.2,8278.6,25986.00,12993.00],
    [12,150000,146000,155000,14805.0,7402.5,17490.0,8745.0,27450.00,13725.00],
    [13,160000,155000,165000,15792.0,7896.0,18656.0,9328.0,29280.00,14640.00],
    [14,170000,165000,175000,16779.0,8389.5,19822.0,9911.0,31110.00,15555.00],
    [15,180000,175000,185000,17766.0,8883.0,20988.0,10494.0,32940.00,16470.00],
    [16,190000,185000,195000,18753.0,9376.5,22154.0,11077.0,34770.00,17385.00],
    [17,200000,195000,210000,19740.0,9870.0,23320.0,11660.0,36600.00,18300.00],
    [18,220000,210000,230000,21714.0,10857.0,25652.0,12826.0,40260.00,20130.00],
    [19,240000,230000,250000,23688.0,11844.0,27984.0,13992.0,43920.00,21960.00],
    [20,260000,250000,270000,25662.0,12831.0,30316.0,15158.0,47580.00,23790.00],
    [21,280000,270000,290000,27636.0,13818.0,32648.0,16324.0,51240.00,25620.00],
    [22,300000,290000,310000,29610.0,14805.0,34980.0,17490.0,54900.00,27450.00],
    [23,320000,310000,330000,31584.0,15792.0,37312.0,18656.0,58560.00,29280.00],
    [24,340000,330000,350000,33558.0,16779.0,39644.0,19822.0,62220.00,31110.00],
    [25,360000,350000,370000,35532.0,17766.0,41976.0,20988.0,65880.00,32940.00],
    [26,380000,370000,395000,37506.0,18753.0,44308.0,22154.0,69540.00,34770.00],
    [27,410000,395000,425000,40467.0,20233.5,47806.0,23903.0,75030.00,37515.00],
    [28,440000,425000,455000,43428.0,21714.0,51304.0,25652.0,80520.00,40260.00],
    [29,470000,455000,485000,46389.0,23194.5,54802.0,27401.0,86010.00,43005.00],
    [30,500000,485000,515000,49350.0,24675.0,58300.0,29150.0,91500.00,45750.00],
    [31,530000,515000,545000,52311.0,26155.5,61798.0,30899.0,96990.00,48495.00],
    [32,560000,545000,575000,55272.0,27636.0,65296.0,32648.0,102480.00,51240.00],
    [33,590000,575000,605000,58233.0,29116.5,68794.0,34397.0,107970.00,53985.00],
    [34,620000,605000,635000,61194.0,30597.0,72292.0,36146.0,113460.00,56730.00],
    [35,650000,635000,665000,64155.0,32077.5,75790.0,37895.0,113460.00,56730.00],
    [36,680000,665000,695000,67116.0,33558.0,79288.0,39644.0,113460.00,56730.00],
    [37,710000,695000,730000,70077.0,35038.5,82786.0,41393.0,113460.00,56730.00],
    [38,750000,730000,770000,74025.0,37012.5,87450.0,43725.0,113460.00,56730.00],
    [39,790000,770000,810000,77973.0,38986.5,92114.0,46057.0,113460.00,56730.00],
    [40,830000,810000,855000,81921.0,40960.5,96778.0,48389.0,113460.00,56730.00],
    [41,880000,855000,905000,86856.0,43428.0,102608.0,51304.0,113460.00,56730.00],
    [42,930000,905000,955000,91791.0,45895.5,108438.0,54219.0,113460.00,56730.00],
    [43,980000,955000,1005000,96726.0,48363.0,114268.0,57134.0,113460.00,56730.00],
    [44,1030000,1005000,1055000,101661.0,50830.5,120098.0,60049.0,113460.00,56730.00],
    [45,1090000,1055000,1115000,107583.0,53791.5,127094.0,63547.0,113460.00,56730.00],
    [46,1150000,1115000,1175000,113505.0,56752.5,134090.0,67045.0,113460.00,56730.00],
    [47,1210000,1175000,1235000,119427.0,59713.5,141086.0,70543.0,113460.00,56730.00],
    [48,1270000,1235000,1295000,125349.0,62674.5,148082.0,74041.0,113460.00,56730.00],
    [49,1330000,1295000,1355000,131271.0,65635.5,155078.0,77539.0,113460.00,56730.00],
    [50,1390000,1355000,9999999999999999999,137193.0,68596.5,162074.0,81037.0,113460.00,56730.00],
  ]
  return data.find(d => d[2] <= standardSalaryByMonth*10000
    && standardSalaryByMonth*10000 < d[3])
}

const standardSalary = (taxSet: TaxSet): number =>
  (taxSet.incomes.find(i => i.subHeaderTitle === '給与所得')?.amount  || 0) / 12

const annuity = (taxSet: TaxSet): number => {
  return manYen(socialInsurance(standardSalary(taxSet))[9] * 12)
}
const healthInsurance = (taxSet: TaxSet): number => {
  return manYen(socialInsurance(standardSalary(taxSet))[taxSet.personalInfo.age >= 40 ? 7 : 5] * 12)
}

// 国民谷区令和２年度）
// https://www.city.setagaya.lg.jp/mokuji/kurashi/003/002/003/d00032129.html
const socialInsuranceForFree = (taxSet: TaxSet): number => {
  const baseOfIncome = Math.max(taxSet.baseOfTaxation - 33, 0)
  const base = Math.min(baseOfIncome * 0.0714 + taxSet.personalInfo.numberOfFamily * 3.99, 63) // 基礎（医療）分
  const support = Math.min(baseOfIncome * 0.0229 + taxSet.personalInfo.numberOfFamily * 1.29, 19) // 支援金分
  const care = taxSet.personalInfo.numberOfFamilyOver40 ?
    Math.min(baseOfIncome * 2.05 + taxSet.personalInfo.numberOfFamilyOver40 * 1.56, 17) : 0 // 介護分
  // TODO: 厳密には所得割は「40歳～64歳の方の賦課基準額」をベースにする。今回は本人の所得ベースで計算
  return base + support + care
}

// 給与所得
const salaryIncome = (): InnerIncome => {
  return {
    subHeaderTitle: '給与所得',
    name: '給与等の収入金額',
    amount: 0,
    deductions: [],
    calculatedDeductions: [{
      name: '給与所得控除',
      calcAmount: (income: Income): number =>
        salaryDeductionProgressiveRate(income.amount || 0)
    }
    ]
  }
}

// 事業所得
const soleProprietorIncome = (): InnerIncome => {
  return {
    subHeaderTitle: '事業所得',
    name: '総収入金額',
    amount: 0,
    deductions: [{
      name: '青色申告特別控除',
      amount: 65,
      editable: false,
    },
    {
      name: '必要経費',
      amount: 0,
      editable: true,
    }],
    calculatedDeductions: []
  }
}

// 雑所得
const otherIncome = (): InnerIncome => {
  return {
    subHeaderTitle: '雑所得',
    name: '総収入金額',
    amount: 0,
    deductions: [
      {
        name: '必要経費・控除',
        amount: 0,
        editable: true,
      }],
    calculatedDeductions: []
  }
}


// 所得控除
export const commonDeductions = (): InnerEditableDeduction[] => {
  return [
    { name: '医療費控除',
      amount: 0,
      editable: true
    },
    { name: 'その他の控除',
      amount: 0,
      editable: true
    },
    ...commonDeductionForReserve(),
    { name: '扶養控除',
      amount: 0,
      editable: true,
      toolTip: '満15歳以下は0万、'
        + '16〜18歳は38万、'
        + '19〜22歳は63万、'
        + '23〜69歳は38万、'
        + '70歳以上(同居以外)は48万、'
        + '70歳以上(同居)は58万'
    },
  ]
}
// 所得控除（退職金積立）
const commonDeductionForReserve = (): InnerEditableDeduction[] => {
  return [
    { name: '小規模企業共済',
      amount: 0,
      editable: true
    },
    { name: 'iDeco',
      amount: 0,
      editable: true
    },
  ]
}
export const commonCalculatedDeductions = (): InnerAutoCalculatedItem[] => {
  return [
    { name: '基礎控除',
      calcAmount: (taxSet: TaxSet): number => {
        if (taxSet.baseOfTaxation <= 2400) return 48
        if (taxSet.baseOfTaxation <= 2450) return 32
        if (taxSet.baseOfTaxation <= 2500) return 16
        return 0
      },
    },
    { name: '配偶者控除',
      calcAmount: (taxSet: TaxSet): number => {
        const calc = (income: number): number => {
          if (income <= 900) return 38
          if (income <= 950) return 26
          if (income <= 1000) return 13
          return 0
        }
        const checked = taxSet.deductions.find(s => s.name === '配偶者控除')?.checked
        return checked ? calc(taxSet.baseOfTaxation) : 0
      },
      availableCheckBox: true,
      checked: false,
      toolTip: '配偶者の年間の合計所得金額が48万円以下（給与収入が103万以下）、老人控除対象配偶者条件を含まない前提の金額を導出'
    },
    ...commonInnerSocialInsurancesForDeductions(),
  ]
}
export const commonInnerSocialInsurancesForDeductions = (): InnerAutoCalculatedItem[] => {
  const res = commonInnerSocialInsurances()
  res.splice(0, 1)
  return res
}
const existsSalary = (taxSet: TaxSet): boolean => {
  return Boolean(taxSet.incomes.find(i => i.name === salaryIncome().name && Number(i.amount || 0) > 0))
}
export const commonInnerSocialInsurances = (): InnerAutoCalculatedItem[] => {
  return [
    { name: '報酬月額',
      calcAmount: (taxSet: TaxSet): number => standardSalary(taxSet),
    },
    { name: '健康保険料',
      calcAmount: (taxSet: TaxSet): number => {
        const premium = taxSet.deductions.find(s => s.name === '健康保険料') as SocialInsurance
        if (premium.availableCheckBox && !premium.checked) {
          premium.editable = true
          return premium.amount as number
        }
        premium.editable = false
        return existsSalary(taxSet) ? healthInsurance(taxSet) : 0
      },
      availableCheckBox: true,
      checked: true
    },
    { name: '厚生年金保険料',
      calcAmount: (taxSet: TaxSet): number => {
        const premium = taxSet.deductions.find(s => s.name === '厚生年金保険料') as SocialInsurance
        if (premium.availableCheckBox && !premium.checked) {
          premium.editable = true
          return premium.amount as number
        }
        premium.editable = false
        return existsSalary(taxSet) ? annuity(taxSet) : 0
      },
      availableCheckBox: true,
      checked: true
    },
    { name: '国民健康保険料',
      calcAmount: (taxSet: TaxSet): number => {
        const premium = taxSet.deductions.find(s => s.name === '国民健康保険料') as SocialInsurance
        if (premium.availableCheckBox && !premium.checked) {
          premium.editable = true
          return premium.amount as number
        }
        premium.editable = false
        return socialInsuranceForFree(taxSet)
      },
      availableCheckBox: true,
      checked: false,
      toolTip: '家族全員の賦課基準額（前年の所得額）－基礎控除33万円）が0円の前提で算出',
    },
    { name: '国民年金保険料',
      calcAmount: (taxSet: TaxSet): number => {
        const premium = taxSet.deductions.find(s => s.name === '国民年金保険料') as SocialInsurance
        if (premium.availableCheckBox && !premium.checked) return 0
        return 19.8460
      },
      availableCheckBox: true,
      checked: false,
    },
  ]
}

// 年金
export const commonRetirementAnnuity = (): InnerAutoCalculatedItem => {
  return {
    name: '年金(40年労働時)',
    calcAmount: (taxSet: TaxSet): number => {
      const allowance = updateForAnnuity({
        paymentYearForBase: existsSalary(taxSet) ? 0 : 40,
        paymentYearForEmployee: existsSalary(taxSet) ? 40 : 0,
        averageStandardSalary: standardSalary(taxSet) * 12,
      })
      return calcAnnuity(allowance)
    }
  }
}

export const commonFurusato = (): InnerAutoCalculatedItem => {
  return {
    name: 'ふるさと納税目安',
    calcAmount: (taxSet: TaxSet): number => {
      const forIncomeTax = Number(taxSet.personalTax.find(p => p.name === '所得税')?.amount) * 0.4
      const forResidentTax = Number(taxSet.personalTax.find(p => p.name === '住民税')?.amount) * 0.3
      return Math.min(forIncomeTax, forResidentTax)
    }
  }
}

// 所得税
export const incomeTax = (taxableIncomeAmount: number): number => {
  const data = [
    [1000, 1949000, 5, 0],
    [1950000, 3299000, 10, 97500],
    [3300000, 6949000, 20, 427500],
    [6950000, 8999000, 23, 636000],
    [9000000, 17999000, 33, 1536000],
    [18000000, 39999000, 40, 2796000],
    [40000000, 9999999999999999, 45, 4796000],
  ]
  const taxableIncomeAmount10000 = taxableIncomeAmount * 10000
  if (taxableIncomeAmount10000 < 1000) return 0
  const row = data.find(d => d[0] <= taxableIncomeAmount10000 && taxableIncomeAmount10000 < d[1]) as number[]
  console.log(taxableIncomeAmount10000, row[2], row[3], manYen(taxableIncomeAmount10000 * row[2] / 100 - row[3]))
  return manYen(taxableIncomeAmount10000 * row[2] / 100 - row[3])
}
// 住民税
export const residentTax = (taxSet: TaxSet, taxableIncomeAmount: number): number => {
  const taxableIncomeAmountForResidentTax = taxableIncomeAmount
    - (Number(taxSet.deductions.find(ded => ded.name === '基礎控除')?.amount || 0) - 33) // 基礎控除の差。所得税は48、住民税は33
  // 東京23区計算
  const taxByEquality = 0.5
  const taxByIncome = taxableIncomeAmountForResidentTax * 0.1
  return Math.max(taxByEquality + taxByIncome, 0)
}
export const commonInnerPersonalTax = (): InnerAutoCalculatedItem[] => {
  return [
    { name: '所得税',
      calcAmount: (taxSet: TaxSet): number => incomeTax(taxSet.taxableIncomeAmount)
    },
    { name: '住民税',
      calcAmount: (taxSet: TaxSet): number => residentTax(taxSet, taxSet.taxableIncomeAmount)
    },
    { name: '復興特別所得税',
      calcAmount: (taxSet: TaxSet): number => Number(taxSet.personalTax.find(p => p.name === '所得税')?.amount || 0) * 0.021
    },
  ]
}


export const defaultIncomeAndDeductionSet = (): InnerTaxSet => {
  return {
    incomes: [
      salaryIncome(),
      soleProprietorIncome(),
      otherIncome(),
    ],
    deductions: commonDeductions(),
    calculatedDeductions: commonCalculatedDeductions(),
    socialInsurance: commonInnerSocialInsurances(), // 社会保険料
    personalTax: commonInnerPersonalTax(), // 税金
    retirementAnnuity: commonRetirementAnnuity(), // 年金試算
    furusato: commonFurusato(), // 年金試算
  }
}

export function taxSetConvert(taxSet: TaxSet): TaxSet {
  const calcAutoAmount = (calculables: InnerAutoCalculable<any>[], showableItems: ShowableItem[], roundDigits?: number) => {
    calculables.forEach(calculable => {
      const ded = showableItems.find(item => item.name === calculable.name) as ShowableItem
      ded.amount = Number(calculable.calcAmount(taxSet).toFixed(roundDigits || 0))
    })
  }
  const innerSet = defaultIncomeAndDeductionSet()
  innerSet.incomes.forEach(innerIncome => {
    const income = taxSet.incomes.find(i => i.name === innerIncome.name) as Income
    innerIncome.calculatedDeductions.map(innerDed => {
      const ded = income.deductions.find(d => d.name === innerDed.name) as Deduction
      ded.amount = innerDed.calcAmount(income)
    })
  })
  // 課税標準
  taxSet.baseOfTaxation = taxSet.incomes
    .map(income => Math.max(
      income.amount - sumAmount(income.deductions),
      0)
    ).reduce((a, b) => a + b)
  // 報酬月額

  // 所得控除
  calcAutoAmount(innerSet.calculatedDeductions, taxSet.deductions)

  // 社会保険料
  calcAutoAmount(innerSet.socialInsurance, taxSet.socialInsurance)

  // 課税所得金額
  taxSet.taxableIncomeAmount = Math.max(taxSet.baseOfTaxation
    - sumAmount(taxSet.deductions),
  0)

  // 税金
  calcAutoAmount(innerSet.personalTax, taxSet.personalTax)

  // 可処分所得
  taxSet.disposableIncome = sumAmount(taxSet.incomes)
    - sumAmount(taxSet.socialInsurance.filter(s => s.name !== '報酬月額'))
    - sumAmount(taxSet.personalTax)
    - sumAmount(taxSet.deductions
      .filter(d => commonDeductionForReserve().find(r => r.name === d.name)))
  // console.log('disposableIncome', taxSet.setNumber,
  //   sumAmount(taxSet.incomes),
  //   sumAmount(taxSet.socialInsurance),
  //   sumAmount(taxSet.personalTax),
  //   sumAmount(taxSet.deductions
  //     .filter(d => commonDeductionForReserve().map(r => r.name === d.name))),
  //   taxSet.disposableIncome
  //   )

  // 退職金
  retirementTaxConvert(taxSet)

  // 年金
  calcAutoAmount([innerSet.retirementAnnuity], [taxSet.retirementAnnuity])

  // ふるさと納税
  calcAutoAmount([innerSet.furusato], [taxSet.furusato], 1)

  return taxSet
}
