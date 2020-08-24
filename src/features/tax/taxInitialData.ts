import {TaxSet} from "./taxSlice";

const updateBaseForFree = (set: TaxSet) => {
  set.deductions[6].checked = false //健康保険
  set.deductions[7].checked = false // 厚生年金
  set.deductions[8].checked = true // 国民健康保険
  set.deductions[9].checked = true // 国民年金
}
const commonBase = (set: TaxSet) => {
  set.personalInfo.age = 33
  set.personalInfo.numberOfFamily = 0
  set.retirementTax.workingYears = 20
}

const personalUpdates = (): PersonalPattern[] => [
  {
    // 個人事業主の節税庵
    num: 1,
    taxSet: (taxSet: TaxSet[]): TaxSet[] => {
      const updateBase = (set: TaxSet) => {
        updateBaseForFree(set)
        commonBase(set)
        set.incomes[1].amount = 900
        set.incomes[1].deductions[1].amount = 200
        set.deductions[1].amount = 0
        set.deductions[2].amount = 27.6
      }
      [0, 1, 2].forEach(i => updateBase(taxSet[i]))

      taxSet[1].deductions[1].amount = 84

      return taxSet
    }
  },
  {
    // 法人時のパターン
    num: 2,
    taxSet: (taxSet: TaxSet[]): TaxSet[] => {
      const updateBase = (set: TaxSet) => {
        commonBase(set)
        set.incomes[0].amount = 440 // 900万売上、200万家賃、100万旅費、100万経費、社会保険料等60万？
        set.deductions[1].amount = 0
        set.deductions[2].amount = 27.6
      }
      [0, 1, 2].forEach(i => updateBase(taxSet[i]))

      taxSet[1].incomes[0].amount = 290
      taxSet[1].incomes[2].amount = 200 // 1000万貸付、200万利子。5%運用として50万利益のため給与から150万減らす

      return taxSet
    }
  },
  {
    // 妻パターン
    num: 10,
    taxSet: (taxSet: TaxSet[]): TaxSet[] => {
      const updateBase = (set: TaxSet) => {
        commonBase(set)
        set.personalInfo.age = 37
        set.personalInfo.numberOfFamily = 0
        set.incomes[0].amount = 500
        set.deductions[1].amount = 84
        set.deductions[2].amount = 27.6
        set.retirementTax.workingYears = 20
      }
      [0, 1, 2].forEach(i => updateBase(taxSet[i]))
      taxSet[1].deductions[1].amount = 0

      taxSet[2].deductions[6].checked = false
      taxSet[2].deductions[6].amount = 13
      taxSet[2].deductions[7].checked = false

      return taxSet
    }
  }
]

interface PersonalPattern {
  num: number,
  taxSet: (taxSet: TaxSet[]) => TaxSet[]
}
export const personalUpdate = (taxSet: TaxSet[], pDataNumber: number): TaxSet[] => {
  return personalUpdates()
    .find(p => p.num === pDataNumber)?.taxSet(taxSet) || taxSet
}

