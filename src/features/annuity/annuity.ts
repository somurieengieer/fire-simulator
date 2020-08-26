// 年金に関する処理
import {numberFixed} from "../utils/Utils";

export interface Annuity {
  paymentYearForBase: number, // 老齢基礎年金
  paymentYearForEmployee: number, // 老齢厚生年金
  averageStandardSalary: number, // 平均標準報酬額
  annuityForBase?: number,
  annuityForEmployee?: number,
}

export function updateForAnnuity(annuity: Annuity): Annuity {

  // 老齢基礎年金
  // 約78万円 × 納付月数 / 480月
  annuity.annuityForBase = numberFixed(78 *
    (annuity.paymentYearForBase + annuity.paymentYearForEmployee) / 40)

  // 老齢厚生年金
  // 平均標準報酬額 × 5.481/1000 × 平成15年4月以降の加入月数
  annuity.annuityForEmployee =
    numberFixed(Math.min(annuity.averageStandardSalary, 1194) * 5.481 / 1000 * annuity.paymentYearForEmployee)

  return annuity
}
export function calcAnnuity(annuity: Annuity): number {
  const updated = updateForAnnuity(annuity)
  console.log('annuity', updated)
  return (updated.annuityForBase || 0) + (updated.annuityForEmployee || 0)
}
