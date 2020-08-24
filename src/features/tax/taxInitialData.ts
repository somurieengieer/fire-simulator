import {TaxSet} from "./taxSlice";

const personalUpdates = (): PersonalPattern[] => [
  {
    // 個人事業主の節税庵
    num: 1,
    taxSet: (taxSet: TaxSet[]): TaxSet[] => {
      const updateBase = (set: TaxSet) => {
        set.personalInfo.age = 33
        set.personalInfo.numberOfFamily = 0
        set.incomes[1].amount = 900
        set.incomes[1].deductions[1].amount = 200
        set.deductions[1].amount = 0
        set.deductions[2].amount = 27.6
        set.retirementTax.workingYears = 20
        set.deductions[6].checked = false //健康保険
        set.deductions[7].checked = false // 厚生年金
        set.deductions[8].checked = true // 国民健康保険
        set.deductions[9].checked = true // 国民年金
      }
      updateBase(taxSet[0])
      updateBase(taxSet[1])
      updateBase(taxSet[2])
      taxSet[1].deductions[1].amount = 84


      return taxSet
    }
  },
  {
    // 法人時のパターン
    num: 2,
    taxSet: (taxSet: TaxSet[]): TaxSet[] => {
      const updateBase = (set: TaxSet) => {
        set.personalInfo.age = 33
        set.personalInfo.numberOfFamily = 0
        set.incomes[0].amount = 500
        set.deductions[1].amount = 0
        set.deductions[2].amount = 27.6
        set.retirementTax.workingYears = 20
      }
      updateBase(taxSet[0])
      updateBase(taxSet[1])
      updateBase(taxSet[2])
      taxSet[1].deductions[1].amount = 84

      taxSet[2].deductions[6].checked = false
      taxSet[2].deductions[6].amount = 13
      taxSet[2].deductions[7].checked = false

      return taxSet
    }
  },
  {
    // 妻パターン
    num: 10,
    taxSet: (taxSet: TaxSet[]): TaxSet[] => {
      const updateBase = (set: TaxSet) => {
        set.personalInfo.age = 37
        set.personalInfo.numberOfFamily = 0
        set.incomes[0].amount = 500
        set.deductions[1].amount = 84
        set.deductions[2].amount = 27.6
        set.retirementTax.workingYears = 20
      }
      updateBase(taxSet[0])
      updateBase(taxSet[1])
      updateBase(taxSet[2])
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

