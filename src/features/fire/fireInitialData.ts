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
  babyCost?: number,
  babyBirthYear?: number,
}
function createPhaseDataForWorker(props: PhaseDataForWorkerProps ): PhaseData[] {
  const result: PhaseData[] = [
    {
      ageAtStart: props.ageAtStart || 22,
      ageAtEnd: props.babyBirthYear ? props.babyBirthYear - 1 : props.ageAtRetirement,
      ageAtStartEditable: true,
      assetAtStartEditable: true,
      note: '仕事中心生活',
      income: props.income,
      expense: props.expense,
      assetAtStart: 0,
      annualInterest: props.annualInterest,
    },]
  if (props.babyBirthYear) {
      result.push({
        ageAtEnd: props.babyBirthYear + 22,
        ageAtStartEditable: false,
        assetAtStartEditable: false,
        note: '子育て期間',
        income: props.income,
        expense: props.expense + (props.babyCost || 0),
        annualInterest: props.annualInterest,
      },
      {
        ageAtStart: props.babyBirthYear + 23,
        ageAtEnd: props.ageAtRetirement,
        ageAtStartEditable: false,
        assetAtStartEditable: false,
        note: '仕事中心生活',
        income: props.income,
        expense: props.expense,
        annualInterest: props.annualInterest,
      }
    )
  }
  result.push({
    ageAtEnd: props.ageAtRetirement + 1,
    ageAtStartEditable: false,
    assetAtStartEditable: false,
    note: '退職金受け取り',
    income: props.retirementAllowance,
    expense: (props.expenseAfterRetirement ?
      (props.ageAtRetirement < 60 ? props.expenseAfterRetirement + 20 : props.expenseAfterRetirement)
      : props.expense),
    annualInterest: props.annualInterest,
  })
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
      expenseAfterRetirement: 240,
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

const fixedAmountInvestigate = () => {
  const by100MYN = {
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
  const by150MYN = {
    label:  '年150万貯金FIREプラン（4%運用）',
    createPhaseData: () =>
      createPhaseDataForWorker({
        ageAtRetirement: 46,
        income: 400,
        retirementAllowance: 700,
        expense: 250,
        expenseAfterRetirement: 240,
        annuity: 160, // 年金
        assetAtStart: 0,
        annualInterest: 4,
      })
  }
  const by200MYN = {
    label:  '年200万貯金FIREプラン（4%運用）',
    createPhaseData: () =>
      createPhaseDataForWorker({
        ageAtRetirement: 41,
        income: 400,
        retirementAllowance: 600,
        expense: 200,
        expenseAfterRetirement: 240,
        annuity: 160, // 年金
        assetAtStart: 0,
        annualInterest: 4,
      })
  }
  return [
    by100MYN,
    by150MYN,
    by200MYN,
  ]
}

const templateOfSolidMiddleRitchMan = {
  label: 'アッパーミドル層堅実FIREプラン（3%運用）',
  createPhaseData: () =>
    createPhaseDataForWorker({
      ageAtStart: 22,
      ageAtRetirement: 56,
      income: 590,
      retirementAllowance: 1600,
      expense: 440,
      expenseAfterRetirement: 360,
      annuity: 180, // 年金
      assetAtStart: 2000,
      annualInterest: 3,
    })
}



const expense20MynPerYear = () => {
  const salary400Myn = {
    label:  'サラリーマン・年収400万',
    createPhaseData: () =>
      createPhaseDataForWorker({
        ageAtRetirement: 58,
        income: 310,
        retirementAllowance: 800,
        expense: 240,
        expenseAfterRetirement: 240,
        annuity: 160, // 年金
        assetAtStart: 0,
        annualInterest: 3,
      })
  }
  const salary500Myn = {
    label:  'サラリーマン・年収500万',
    createPhaseData: () =>
      createPhaseDataForWorker({
        ageAtRetirement: 49,
        income: 390,
        retirementAllowance: 700,
        expense: 240,
        expenseAfterRetirement: 240,
        annuity: 160, // 年金
        assetAtStart: 0,
        annualInterest: 3,
      })
  }
  const salary600Myn = {
    label:  'サラリーマン・年収600万',
    createPhaseData: () =>
      createPhaseDataForWorker({
        ageAtRetirement: 43,
        income: 460,
        retirementAllowance: 800,
        expense: 240,
        expenseAfterRetirement: 240,
        annuity: 160, // 年金
        assetAtStart: 0,
        annualInterest: 3,
      })
  }
  const soleProprietorSaving50Myn = {
    label:  '個人事業主・年50万投資',
    createPhaseData: () =>
      createPhaseDataForWorker({
        ageAtRetirement: 62,
        income: 290,
        retirementAllowance: 2500,
        expense: 240,
        expenseAfterRetirement: 240,
        annuity: 74, // 年金
        assetAtStart: 0,
        annualInterest: 3,
      })
  }
  const soleProprietorSaving100Myn = {
    label:  '個人事業主・年100万投資',
    createPhaseData: () =>
      createPhaseDataForWorker({
        ageAtRetirement: 53,
        income: 340,
        retirementAllowance: 2500,
        expense: 240,
        expenseAfterRetirement: 240,
        annuity: 74, // 年金
        assetAtStart: 0,
        annualInterest: 3,
      })
  }
  const soleProprietorSaving150Myn = {
    label:  '個人事業主・年150万投資',
    createPhaseData: () =>
      createPhaseDataForWorker({
        ageAtRetirement: 48,
        income: 390,
        retirementAllowance: 2200,
        expense: 240,
        expenseAfterRetirement: 240,
        annuity: 74, // 年金
        assetAtStart: 0,
        annualInterest: 3,
      })
  }
  const soleProprietorSaving200Myn = {
    label:  '個人事業主・年200万投資',
    createPhaseData: () =>
      createPhaseDataForWorker({
        ageAtRetirement: 44,
        income: 440,
        retirementAllowance: 2000,
        expense: 240,
        expenseAfterRetirement: 240,
        annuity: 74, // 年金
        assetAtStart: 0,
        annualInterest: 3,
      })
  }
  return [
    salary400Myn,
    salary500Myn,
    salary600Myn,
    soleProprietorSaving50Myn,
    soleProprietorSaving100Myn,
    soleProprietorSaving150Myn,
    soleProprietorSaving200Myn,
  ]
}

const expense25MynPerYear = () => {
  const salary500Myn = {
    label:  'サラリーマン・年収500万',
    createPhaseData: () =>
      createPhaseDataForWorker({
        ageAtRetirement: 58,
        income: 390,
        retirementAllowance: 1200,
        expense: 300,
        expenseAfterRetirement: 300,
        annuity: 170, // 年金
        assetAtStart: 0,
        annualInterest: 3,
      })
  }
  const salary600Myn = {
    label:  'サラリーマン・年収600万',
    createPhaseData: () =>
      createPhaseDataForWorker({
        ageAtRetirement: 51,
        income: 460,
        retirementAllowance: 800,
        expense: 300,
        expenseAfterRetirement: 300,
        annuity: 180, // 年金
        assetAtStart: 0,
        annualInterest: 3,
      })
  }
  const soleProprietorSaving100Myn = {
    label:  '個人事業主・年100万投資',
    createPhaseData: () =>
      createPhaseDataForWorker({
        ageAtRetirement: 56,
        income: 400,
        retirementAllowance: 3000,
        expense: 300,
        expenseAfterRetirement: 300,
        annuity: 74, // 年金
        assetAtStart: 0,
        annualInterest: 3,
      })
  }
  const soleProprietorSaving150Myn = {
    label:  '個人事業主・年150万投資',
    createPhaseData: () =>
      createPhaseDataForWorker({
        ageAtRetirement: 51,
        income: 450,
        retirementAllowance: 2400,
        expense: 300,
        expenseAfterRetirement: 300,
        annuity: 74, // 年金
        assetAtStart: 0,
        annualInterest: 3,
      })
  }
  const soleProprietorSaving200Myn = {
    label:  '個人事業主・年200万投資',
    createPhaseData: () =>
      createPhaseDataForWorker({
        ageAtRetirement: 46,
        income: 500,
        retirementAllowance: 2000,
        expense: 300,
        expenseAfterRetirement: 300,
        annuity: 74, // 年金
        assetAtStart: 0,
        annualInterest: 3,
      })
  }
  return [
    salary500Myn,
    salary600Myn,
    soleProprietorSaving100Myn,
    soleProprietorSaving150Myn,
    soleProprietorSaving200Myn,
  ]
}

const expense20MynPerYearWithChildren = () => {
  const solidManBy600income = {
    label: 'サラリーマン・年収600万・子供あり（3%運用）',
    createPhaseData: () =>
      createPhaseDataForWorker({
        ageAtStart: 22,
        ageAtRetirement: 51,
        income: 470,
        retirementAllowance: 800,
        expense: 270,
        expenseAfterRetirement: 240,
        annuity: 140, // 年金
        assetAtStart: 2000,
        annualInterest: 3,
        babyCost: 100,
        babyBirthYear: 28,
      })
  }
  return [
    solidManBy600income,
  ]
}
export const templateLabel = (label: string): PhasesTemplate => {
  return {label: ` --- ${label} --- `, createPhaseData: () => undefined}
}


export interface PhasesTemplate {
  label: string,
  createPhaseData: () => PhaseData[] | undefined,
}

export const phasesTemplates: PhasesTemplate[] = [
  templateOfNormalSalaryMan,
  templateOfNormalSalaryMan3percent,
  templateOfSolidMan,
  initialPhasesOf40fire,
  // 定期投資
  templateLabel('定額投資'),
  ...fixedAmountInvestigate(),
  templateOfSolidMiddleRitchMan,
  templateLabel('月20万円で生活するFIRE（3%運用）'),
  ...expense20MynPerYear(),
  templateLabel('月25万円で生活するFIRE（3%運用）'),
  ...expense25MynPerYear(),
  // 子供あり
  templateLabel('月20万円で生活するFIRE（3%運用）・子供あり'),
  ...expense20MynPerYearWithChildren(),
]