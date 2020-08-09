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
  expense: number,
  annuity: number, // 年金
  assetAtStart: number,
  annualInterest: number,
}
function createPhaseDataForWorker(props: PhaseDataForWorkerProps ): PhaseData[] {
  return [ {
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
      ageAtStart: props.ageAtRetirement,
      ageAtEnd: 60,
      ageAtStartEditable: false,
      assetAtStartEditable: false,
      note: '年金受給前生活（年金支払いあり）',
      income: 0,
      expense: props.expense,
      annualInterest: props.annualInterest,
    },
    {
      ageAtStart: 61,
      ageAtEnd: 70,
      ageAtStartEditable: false,
      assetAtStartEditable: false,
      note: '年金受給前生活（年金支払なし）',
      income: 0,
      expense: props.expense - 20,
      annualInterest: props.annualInterest,
    },
    {
      ageAtStart: 71,
      ageAtEnd: 85,
      ageAtStartEditable: false,
      assetAtStartEditable: false,
      note: '年金受給生活',
      income: props.annuity,
      expense: props.expense - 20,
      annualInterest: props.annualInterest,
    },
  ]

}

const templateOfNormalSalaryMan = {
  label: '平均的なサラリーマン（運用なし）',
  createPhaseData: () => [
    {
      ageAtStart: 22,
      ageAtEnd: 60,
      ageAtStartEditable: true,
      assetAtStartEditable: true,
      note: 'サラリーマン生活',
      income: 600,
      expense: 500,
      assetAtStart: 0,
      annualInterest: 0,
    },
    {
      ageAtStart: 61,
      ageAtEnd: 70,
      ageAtStartEditable: false,
      assetAtStartEditable: false,
      note: '年金受給前生活',
      income: 0,
      expense: 250,
      annualInterest: 0,
    },
    {
      ageAtStart: 71,
      ageAtEnd: 85,
      ageAtStartEditable: false,
      assetAtStartEditable: false,
      note: '年金受給生活',
      income: 200,
      expense: 250,
      annualInterest: 0,
    },
  ]
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
      expense: 270,
      annuity: 140, // 年金
      assetAtStart: 2000,
      annualInterest: 3,
    })
  // createPhaseData: () => [
  //   {
  //     ageAtStart: 32,
  //     ageAtEnd: 50,
  //     ageAtStartEditable: true,
  //     assetAtStartEditable: true,
  //     note: '倹約労働',
  //     income: 600,
  //     expense: 400,
  //     assetAtStart: 2000,
  //     annualInterest: 3,
  //   },
  //   {
  //     ageAtStart: 51,
  //     ageAtEnd: 70,
  //     ageAtStartEditable: false,
  //     assetAtStartEditable: false,
  //     note: '年金受給前生活',
  //     income: 0,
  //     expense: 300,
  //     annualInterest: 3,
  //   },
  //   {
  //     ageAtStart: 71,
  //     ageAtEnd: 85,
  //     ageAtStartEditable: false,
  //     assetAtStartEditable: false,
  //     note: '年金受給生活',
  //     income: 140,
  //     expense: 300,
  //     annualInterest: 3,
  //   },
  // ]
}

const initialPhasesOf40fire = {
  label:  '40歳FIREプラン（4%運用）',
  createPhaseData: () =>
    createPhaseDataForWorker({
      ageAtRetirement: 40,
      income: 470,
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
      expense: 300,
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