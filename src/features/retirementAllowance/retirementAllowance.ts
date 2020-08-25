// 年金に関する処理
import {numberFixed} from "../utils/Utils";

export interface RetirementAllowance {
  paymentYearForBase: number, // 老齢基礎年金
  paymentYearForEmployee: number, // 老齢厚生年金
  averageStandardSalary: number, // 平均標準報酬額
  annuityForBase?: number,
  annuityForEmployee?: number,
}

export function updateForRetirementAllowance(allowance: RetirementAllowance): RetirementAllowance {

  // 老齢基礎年金
  // 約78万円 × 納付月数 / 480月
  allowance.annuityForBase = numberFixed(78 *
    (allowance.paymentYearForBase + allowance.paymentYearForEmployee) / 40)

  // 老齢厚生年金
  // 平均標準報酬額 × 5.481/1000 × 平成15年4月以降の加入月数
  allowance.annuityForEmployee =
    numberFixed(allowance.averageStandardSalary * 5.481 / 1000 * allowance.paymentYearForEmployee)

  return allowance
}
export function calcAnnuity(allowance: RetirementAllowance): number {
  const updated = updateForRetirementAllowance(allowance)
  console.log('annuity', updated)
  return (updated.annuityForBase || 0) + (updated.annuityForEmployee || 0)
}
