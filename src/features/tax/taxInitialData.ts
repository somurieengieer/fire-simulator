import {TaxSet} from "./taxSlice";

export const personalUpdate = (taxSet: TaxSet[]): TaxSet[] => {
  const set1 = taxSet[0]
  set1.personalInfo.age = 37
  set1.personalInfo.numberOfFamily = 0
  set1.incomes[0].amount = 500
  set1.deductions[1].amount = 84
  set1.deductions[2].amount = 81.6
  set1.retirementTax.workingYears = 20

  return taxSet
}
