import {create, createPhaseDataAfterRetirement, createPhaseDataForWorker, PhasesTemplate} from './fireInitialData'

export const pData1 = {
  label: '個人事業主・月30万生活・子供あり・完全に引退せず細々働く・独力',
  createPhaseData: () =>
    createPhaseDataForWorker({
      ageAtStart: 32,
      ageAtRetirement: 55,
      income: 560,
      retirementAllowance: 1800,
      expense: 360,
      expenseAfterRetirement: 360,
      annuity: 180, // 年金
      assetAtStart: 2000,
      annualInterest: 3,
      babyCost: 100,
      babyBirthYear: 33
    })
}

export const pData2 = {
  label: '個人事業主・月30万生活・子供あり・完全に引退せず細々働く',
  createPhaseData: () => [
    create(true, {
      ageAtStart: 33,
      ageAtEnd: 35,
      note: '子育て生活（実家）',
      income: 600,
      expense: 200,
      assetAtStart: 2200,
      annualInterest: 3
    }),
    create(false, {
      ageAtEnd: 46,
      note: '子育て生活（都内）',
      income: 300,
      expense: 200,
      annualInterest: 3
    }),
    create(false, {
      ageAtEnd: 55,
      note: '子育て生活（都内）細々働く',
      income: 100,
      expense: 200,
      annualInterest: 3
    }),
    create(false, {
      ageAtEnd: 56,
      note: '退職金もらう',
      income: 560,
      expense: 200,
      annualInterest: 3
    }),
    ...createPhaseDataAfterRetirement({
      ageAtRetirement: 57,
      income: 0,
      retirementAllowance: 0,
      expense: 200,
      expenseAfterRetirement: 200,
      annuity: 160, // 年金
      assetAtStart: 0,
      annualInterest: 3
    })
  ]
}

export const pData3 = {
  label: '法人化・月30万生活・子供あり・完全に引退せず細々働く',
  createPhaseData: () => [
    create(true, {
      ageAtStart: 34,
      ageAtEnd: 35,
      note: '子育て生活（実家）',
      income: 400,
      expense: 200,
      assetAtStart: 2200,
      annualInterest: 3
    }),
    create(false, {
      ageAtEnd: 46,
      note: '子育て生活（都内）',
      income: 400,
      expense: 250,
      annualInterest: 3
    }),
    create(false, {
      ageAtEnd: 55,
      note: '子育て生活（都内）細々働く',
      income: 100,
      expense: 200,
      annualInterest: 3
    }),
    create(false, {
      ageAtEnd: 56,
      note: '退職金もらう',
      income: 560,
      expense: 200,
      annualInterest: 3
    }),
    ...createPhaseDataAfterRetirement({
      ageAtRetirement: 57,
      income: 0,
      retirementAllowance: 0,
      expense: 200,
      expenseAfterRetirement: 200,
      annuity: 160, // 年金
      assetAtStart: 0,
      annualInterest: 3
    })
  ]
}

export const pData4 = {
  label: '年150万貯金・年200万生活',
  createPhaseData: () => [
    create(true, {
      ageAtStart: 38,
      ageAtEnd: 40,
      note: '子育て生活（実家）',
      income: 150,
      expense: 0,
      assetAtStart: 2000,
      annualInterest: 3
    }),
    create(false, {
      ageAtEnd: 56,
      note: '労働期間',
      income: 150,
      expense: 0,
      annualInterest: 3
    }),
    // create(false, {
    //   ageAtEnd: 57,
    //   note: '退職金もらう',
    //   income: 400,
    //   expense: 200,
    //   annualInterest: 3,
    // }),
    ...createPhaseDataAfterRetirement({
      ageAtRetirement: 57,
      income: 0,
      retirementAllowance: 400,
      expense: 200,
      expenseAfterRetirement: 200,
      annuity: 160, // 年金
      assetAtStart: 0,
      annualInterest: 3
    })
  ]
}

export const financialPDatas = (): PhasesTemplate[] => {
  return [
    pData3, // 法人化・月30万生活・子供あり・完全に引退せず細々働く
    pData2, // 個人事業主・月30万生活・子供あり・完全に引退せず細々働く
    // pData1, // 個人事業主・月30万生活・子供あり・完全に引退せず細々働く・独力
    pData4 // 年150万貯金・年200万生活
  ]
}
