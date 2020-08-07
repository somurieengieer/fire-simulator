import {PhaseData} from "../../layout/molecules/Phase";

// 平均的なサラリーマン
export const initialStateOfNormalSalaryMan = (): PhaseData[] => [
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
export const initialStateOfNormalSalaryMan3percent = (): PhaseData[] =>
  initialStateOfNormalSalaryMan().map(v => Object.assign(v, {annualInterest: 3}))


