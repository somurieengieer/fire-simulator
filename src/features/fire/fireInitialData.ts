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

// 平均的なサラリーマン（運用なし）
export const initialPhasesOfNormalSalaryMan = (): PhaseData[] => [
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
];
// 平均的なサラリーマン（3%運用）
export const initialPhasesOfNormalSalaryMan3percent = (): PhaseData[] =>
  initialPhasesOfNormalSalaryMan().map(v => Object.assign(v, {annualInterest: 3}))

// 堅実FIREプラン（3%運用）
export const initialPhasesOfSolidMan = (): PhaseData[] => [
  {
    ageAtStart: 32,
    ageAtEnd: 50,
    ageAtStartEditable: true,
    assetAtStartEditable: true,
    note: '倹約労働',
    income: 600,
    expense: 400,
    assetAtStart: 2000,
    annualInterest: 3,
  },
  {
    ageAtStart: 51,
    ageAtEnd: 70,
    ageAtStartEditable: false,
    assetAtStartEditable: false,
    note: '年金受給前生活',
    income: 0,
    expense: 300,
    annualInterest: 3,
  },
  {
    ageAtStart: 71,
    ageAtEnd: 85,
    ageAtStartEditable: false,
    assetAtStartEditable: false,
    note: '年金受給生活',
    income: 140,
    expense: 300,
    annualInterest: 3,
  },
]


// 40歳FIREプラン（4%運用）
export const initialPhasesOf40fire = (): PhaseData[] => [
  {
    ageAtStart: 22,
    ageAtEnd: 40,
    ageAtStartEditable: true,
    assetAtStartEditable: true,
    note: '倹約労働',
    income: 470,
    expense: 260,
    assetAtStart: 0,
    annualInterest: 4,
  },
  {
    ageAtStart: 41,
    ageAtEnd: 60,
    ageAtStartEditable: false,
    assetAtStartEditable: false,
    note: '年金受給前生活（国民健康保険支払いあり）',
    income: 0,
    expense: 260,
    annualInterest: 4,
  },
  {
    ageAtStart: 61,
    ageAtEnd: 70,
    ageAtStartEditable: false,
    assetAtStartEditable: false,
    note: '年金受給前生活',
    income: 0,
    expense: 240,
    annualInterest: 4,
  },
  {
    ageAtStart: 71,
    ageAtEnd: 85,
    ageAtStartEditable: false,
    assetAtStartEditable: false,
    note: '年金受給生活',
    income: 140,
    expense: 240,
    annualInterest: 4,
  },
]

