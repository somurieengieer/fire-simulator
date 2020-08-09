import {PhaseData} from "./Phase";

// デフォルト値
export const initialPhasesDefault = (): PhaseData[] => [
  {
    ageAtStart: 22,
    ageAtEnd: 60,
    ageAtStartEditable: true,
    assetAtStartEditable: true,
    note: '',
    income: 500,
    expense: 400,
    assetAtStart: 600,
    annualInterest: 3,
  }
]

interface PhaseDataForWorkerProps {
  ageAtStart?: number,
  ageAtRetirement: number,
  income: number,
  retirementAllowance: number,
  expense: number,
  expenseAfterRetirement?: number,
  annuity: number, // 年金
  assetAtStart: number,
  annualInterest: number,
}
function createPhaseDataForWorker(props: PhaseDataForWorkerProps ): PhaseData[] {
  const result = [
    {
      ageAtStart: props.ageAtStart || 22,
      ageAtEnd: props.ageAtRetirement,
      ageAtStartEditable: true,
      assetAtStartEditable: true,
      note: 'サラリーマン生活',
      income: props.income,
      expense: props.expense,
      assetAtStart: 0,
      annualInterest: props.annualInterest,
    },
    {
      ageAtEnd: props.ageAtRetirement + 1,
      ageAtStartEditable: false,
      assetAtStartEditable: false,
      note: '退職金受け取り',
      income: props.retirementAllowance,
      expense: props.expenseAfterRetirement ? props.expenseAfterRetirement + 20 : props.expense,
      annualInterest: props.annualInterest,
    },
    ]
  if (props.ageAtRetirement < 60) {
    result.push({
        ageAtEnd: 60,
        ageAtStartEditable: false,
        assetAtStartEditable: false,
        note: '年金受給前生活（年金支払いあり）',
        income: 0,
        expense: props.expenseAfterRetirement ? props.expenseAfterRetirement + 20 : props.expense,
        annualInterest: props.annualInterest,
      })
  }
  result.push({
      ageAtEnd: 70,
      ageAtStartEditable: false,
      assetAtStartEditable: false,
      note: '年金受給前生活（年金支払なし）',
      income: 0,
      expense: props.expenseAfterRetirement || props.expense - 20,
      annualInterest: props.annualInterest,
    },
    {
      ageAtEnd: 85,
      ageAtStartEditable: false,
      assetAtStartEditable: false,
      note: '年金受給生活',
      income: props.annuity,
      expense: props.expenseAfterRetirement || props.expense - 20,
      annualInterest: props.annualInterest,
    },
  )
  console.log('result', result)
  return result
}

const templateOfNormalSalaryMan = {
  label: '平均的なサラリーマン（運用なし）',
  createPhaseData: () => {

    const phaseData = createPhaseDataForWorker({
      ageAtStart: 22,
      ageAtRetirement: 60,
      income: 470,
      retirementAllowance: 1500,
      expense: 420,
      expenseAfterRetirement: 200,
      annuity: 200, // 年金
      assetAtStart: 0,
      annualInterest: 0,
    })
    return phaseData
  }
}

const templateOfNormalSalaryMan3percent = {
  label: '平均的なサラリーマン（3%運用）',
  createPhaseData: () =>
    templateOfNormalSalaryMan.createPhaseData().map(v => Object.assign(v, {annualInterest: 3}))
}

const templateOfSolidMan = {
  label: '堅実FIREプラン（3%運用）',
  createPhaseData: () =>
    createPhaseDataForWorker({
      ageAtStart: 32,
      ageAtRetirement: 50,
      income: 470,
      retirementAllowance: 800,
      expense: 270,
      expenseAfterRetirement: 200,
      annuity: 140, // 年金
      assetAtStart: 2000,
      annualInterest: 3,
    })
}

const initialPhasesOf40fire = {
  label:  '40歳FIREプラン（4%運用）',
  createPhaseData: () =>
    createPhaseDataForWorker({
      ageAtRetirement: 40,
      income: 470,
      retirementAllowance: 500,
      expense: 260,
      annuity: 140, // 年金
      assetAtStart: 0,
      annualInterest: 4,
    })
}

const initialPhasesOf100MPYfire = {
  label:  '年100万貯金FIREプラン（4%運用）',
  createPhaseData: () =>
    createPhaseDataForWorker({
      ageAtRetirement: 52,
      income: 400,
      retirementAllowance: 800,
      expense: 300,
      expenseAfterRetirement: 240,
      annuity: 160, // 年金
      assetAtStart: 0,
      annualInterest: 4,
    })
}

export interface PhasesTemplate {
  label: string,
  createPhaseData: () => PhaseData[],
}

export const phasesTemplates: PhasesTemplate[] = [
  templateOfNormalSalaryMan,
  templateOfNormalSalaryMan3percent,
  templateOfSolidMan,
  initialPhasesOf40fire,
  initialPhasesOf100MPYfire
]