import { calcCompoundInterestResult, CompoundInterestResult } from '../compoundInterest/compoundInterest'

export interface PhaseData {
  ageAtStart?: number, // フェーズ開始時年齢
  ageAtEnd?: number, // フェーズ終了時年齢
  ageAtStartEditable: boolean,
  assetAtStartEditable: boolean,
  note: string,
  income?: number, // 収入
  expense?: number, // 支出
  assetAtStart?: number, // 開始時資産
  annualInterest?: number, // 年利
  // assetAtEnd(): number, // 終了時資産
}

export class PhaseClass implements PhaseData {
  ageAtStart!: number;

  ageAtEnd!: number;

  ageAtStartEditable!: boolean;

  assetAtStartEditable!: boolean;

  note!: string;

  income!: number;

  expense!: number;

  assetAtStart!: number;

  annualInterest!: number;

  constructor (data: PhaseData) {
    Object.assign(this, data)
  }

  operationPeriod (): number { // 運用期間（年数）
    return this.ageAtEnd - this.ageAtStart
  }

  investmentByYear (): number {
    return this.income - this.expense
  }

  assetAtEnd (): number { // 終了時資産
    return this.compoundInterestResult().rowByYear.slice(-1)[0]?.amount
  }

  compoundInterestResult (): CompoundInterestResult {
    return calcCompoundInterestResult({
      presentAmount: this.assetAtStart,
      reserveAmount: this.investmentByYear(),
      reserveYears: this.operationPeriod(),
      annualInterest: this.annualInterest
    })
  }
}

export class PhasesClass {
  phases: PhaseClass[]

  constructor (phases: PhaseClass[]) {
    this.phases = phases
  }

  compoundInterestResult (): CompoundInterestResult {
    const results = this.phases.map((phase) => phase.compoundInterestResult())
      .reduce((accum: CompoundInterestResult, cur: CompoundInterestResult) => {
        const lastYear = accum.rowByYear.slice(-2)[0].year
        const arrangedRows = cur.rowByYear.map((r) => Object.assign(r, { year: (r.year + lastYear + 1) }))
        const newRowByYear = accum.rowByYear.slice(0, -1)
        newRowByYear.push(...arrangedRows)
        return { rowByYear: newRowByYear }
      })
    return results
  }
}
