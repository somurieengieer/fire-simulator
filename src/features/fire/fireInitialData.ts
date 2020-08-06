import {PhaseData} from "../../layout/molecules/Phase";

// 平均的なサラリーマン
export const initialStateOfNormalSalaryMan: PhaseData[] = [
  {
    ageAtStart: 22,
    ageAtEnd: 60,
    ageAtStartEditable: true,
    assetAtStartEditable: true,
    income: 600,
    expense: 500,
    assetAtStart: 0,
    annualInterest: 3,
  },
  {
    ageAtStart: 61,
    ageAtEnd: 70,
    ageAtStartEditable: false,
    assetAtStartEditable: false,
    income: 0,
    expense: 250,
    annualInterest: 3,
  },
  {
    ageAtStart: 71,
    ageAtEnd: 85,
    ageAtStartEditable: false,
    assetAtStartEditable: false,
    income: 200,
    expense: 250,
    annualInterest: 3,
  },
];


