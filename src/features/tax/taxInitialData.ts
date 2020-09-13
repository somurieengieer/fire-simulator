import { TaxSet } from './taxSlice'

const updateBaseForFree = (set: TaxSet) => {
  set.deductions[7].checked = false // 健康保険
  set.deductions[8].checked = false // 厚生年金
  set.deductions[9].checked = true // 国民健康保険
  set.deductions[10].checked = true // 国民年金
}
const commonBase = (set: TaxSet) => {
  set.personalInfo.age = 33
  set.personalInfo.numberOfFamily = 0
  set.retirementTax.workingYears = 20
}

const freePattern = (taxSet: TaxSet[]): TaxSet[] => {
  const updateBase = (set: TaxSet) => {
    updateBaseForFree(set)
    commonBase(set)
    set.incomes[1].amount = 900
    set.incomes[1].deductions[1].amount = 200
    set.deductions[0].amount = 80 // 医療費控除
    set.deductions[1].amount = 4 // その他の控除
    set.deductions[2].amount = 84 // 小規模共済に加入した場合
    set.deductions[3].amount = 81.6 // iDeco
    set.deductions[7].amount = 36 // 健康保険
    set.deductions[9].checked = false // 国民健康保険
  }
  [0, 1, 2].forEach(i => updateBase(taxSet[i]))

  taxSet[0].incomes[1].amount = 1005
  taxSet[0].incomes[2].amount = 132

  return taxSet
}

const companyLivingRent = (taxSet: TaxSet[]): TaxSet[] => {
  const updateBase = (set: TaxSet) => {
    commonBase(set)
    set.incomes[0].amount = 440 // 900万売上、200万家賃、100万旅費、100万経費、社会保険料等60万？
    set.deductions[2].amount = 0
    set.deductions[3].amount = 27.6
  }
  [0, 1, 2].forEach(i => updateBase(taxSet[i]))

  taxSet[1].incomes[0].amount = 340
  taxSet[1].incomes[2].amount = 150 // 1000万貸付、150万利子。5%運用として50万利益のため給与から100万減らす

  taxSet[2].incomes[0].amount = 240
  taxSet[2].incomes[2].amount = 300 // 2000万貸付、300万利子。5%運用として100万利益のため給与から200万減らす

  return taxSet
}

const companyWithOtherIncome = (taxSet: TaxSet[]): TaxSet[] => {
  const updateBase = (set: TaxSet) => {
    commonBase(set)
    set.incomes[0].amount = 640 // 900万売上、100万旅費、100万経費、社会保険料等60万？
    set.deductions[2].amount = 0
    set.deductions[3].amount = 27.6
  }
  [0, 1, 2].forEach(i => updateBase(taxSet[i]))

  taxSet[1].incomes[0].amount = 320 // 夫婦で300万ずつ給与のパターン

  taxSet[2].incomes[0].amount = 550 // 一人で受け取って雑所得
  taxSet[2].incomes[2].amount = 150 // 1000万貸付、150万利子。5%運用として50万利益のため給与から100万減らす

  return taxSet
}

const companyAtCountrySide = (taxSet: TaxSet[]): TaxSet[] => {
  const updateBase = (set: TaxSet) => {
    commonBase(set)
    set.incomes[0].amount = 360 // 900万売上、100万旅費、100万経費、社会保険料等60万？
    set.deductions[2].amount = 0
    set.deductions[3].amount = 27.6
  }
  [0, 1, 2].forEach(i => updateBase(taxSet[i]))

  taxSet[0].incomes[0].amount = 720
  taxSet[0].deductions[6].checked = true // 配偶者控除

  return taxSet
}
const companyAtCountrySide2 = (taxSet: TaxSet[]): TaxSet[] => {
  const updateBase = (set: TaxSet) => {
    commonBase(set)
    set.incomes[0].amount = 360 // 900万売上、100万旅費、100万経費、社会保険料等60万？
    set.deductions[2].amount = 0
    set.deductions[3].amount = 27.6
  }
  [0, 1, 2].forEach(i => updateBase(taxSet[i]))

  taxSet[1].incomes[0].amount = 600
  taxSet[1].deductions[6].checked = true // 配偶者控除

  taxSet[2].incomes[0].amount = 120
  taxSet[2].deductions[7].checked = false // 健康保険
  taxSet[2].deductions[8].checked = false // 厚生年金

  return taxSet
}

const wife = (taxSet: TaxSet[]): TaxSet[] => {
  const updateBase = (set: TaxSet) => {
    commonBase(set)
    set.personalInfo.age = 37
    set.personalInfo.numberOfFamily = 0
    set.incomes[0].amount = 500
    set.deductions[2].amount = 84
    set.deductions[3].amount = 27.6
    set.retirementTax.workingYears = 20
  }
  [0, 1, 2].forEach(i => updateBase(taxSet[i]))
  taxSet[1].deductions[2].amount = 0

  taxSet[2].deductions[7].checked = false
  taxSet[2].deductions[7].amount = 13
  taxSet[2].deductions[8].checked = false

  return taxSet
}

interface PersonalPattern {
  num: number,
  taxSet: (taxSet: TaxSet[]) => TaxSet[]
}

export const personalUpdate = (taxSet: TaxSet[], pDataNumber: number): TaxSet[] => {
  const patterns: PersonalPattern[] = [
    { num: 1, taxSet: freePattern }, // 個人事業主の節税案
    { num: 2, taxSet: companyLivingRent }, // 法人・賃貸マンション暮らし
    { num: 3, taxSet: companyWithOtherIncome }, // 法人実家パターン（雑所得考慮パターン）
    { num: 4, taxSet: companyAtCountrySide }, // 法人実家パターン
    { num: 5, taxSet: companyAtCountrySide2 }, // 法人実家パターン２
    { num: 5, taxSet: companyAtCountrySide2 }, // 法人実家パターン２
    { num: 10, taxSet: wife } // 妻パターン（法人で役員報酬120万。社会保険料加入）
  ]
  return patterns.find(p => p.num === pDataNumber)?.taxSet(taxSet) || taxSet
}
