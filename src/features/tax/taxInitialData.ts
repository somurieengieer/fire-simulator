import {TaxSet} from "./taxSlice";

const personalUpdate1 = (taxSet: TaxSet[]): TaxSet[] => {
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

export const personalUpdate = (taxSet: TaxSet[], pDataNumber: number): TaxSet[] => {
  switch (pDataNumber) {
    case 1:
      return personalUpdate1(taxSet)
    default:
      return taxSet
  }
}
