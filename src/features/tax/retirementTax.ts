import {TaxSet} from './taxSlice'
import {incomeTax, residentTax} from './tax'

export interface InnerRetirementTax {
  workingYears: number, // 労働年数
  income: number, // 退職金（会社支払）
  incomeAutoCalculated: number, // 退職金（iDeco、小規模企業共済）
  taxAmount: number, // 退職金税額（所得税・住民税）
  disposableIncome: number, // 退職金可処分所得
}

export function retirementTaxConvert (taxSet: TaxSet): void {
  const retirementTax = taxSet.retirementTax
  const reservedPerYear = Number(taxSet.deductions.find(d => d.name === '小規模企業共済')?.amount || 0) +
    Number(taxSet.deductions.find(d => d.name === 'iDeco')?.amount || 0)
  retirementTax.incomeAutoCalculated = reservedPerYear * retirementTax.workingYears

  const totalAmount = (retirementTax.income + retirementTax.incomeAutoCalculated)
  let deductionAmount = 40 * retirementTax.workingYears +
    (retirementTax.workingYears > 20 ? (retirementTax.workingYears - 20) * 30 : 0)
  if (deductionAmount < 80) {
    deductionAmount = 80
  }

  // 課税退職所得金額
  const taxableIncomeAmount = Math.round((totalAmount - deductionAmount) / 2)

  // 税金（所得税・住民税）
  retirementTax.taxAmount = Math.round(incomeTax(taxableIncomeAmount) + residentTax(taxSet, taxableIncomeAmount))

  retirementTax.disposableIncome = Math.round(totalAmount - retirementTax.taxAmount)
}
