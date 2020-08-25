import {PhaseData} from "./Phase";
import {financialPDatas} from "./personalFireInitialData";

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
export function create(editable: boolean, obj: any): PhaseData {
  return Object.assign({
    ageAtStartEditable: editable,
    assetAtStartEditable: editable,
  }, obj) as PhaseData
}
export function createPhaseDataForWorker(props: PhaseDataForWorkerProps ): PhaseData[] {
  const result: PhaseData[] = []
    result.push(
    {
      ageAtStart: props.ageAtStart || 22,
      ageAtEnd: props.babyBirthYear ? props.babyBirthYear - 1 : props.ageAtRetirement,
      ageAtStartEditable: true,
      assetAtStartEditable: true,
      note: '仕事中心生活',
      income: props.income,
      expense: props.expense,
      assetAtStart: props.assetAtStart,
      annualInterest: props.annualInterest,
    })
  if (props.babyBirthYear) {
    result.push({
      ageAtEnd: props.babyBirthYear + 22,
      ageAtStartEditable: false,
      assetAtStartEditable: false,
      note: '子育て期間',
      income: props.income,
      expense: props.expense + (props.babyCost || 0),
      annualInterest: props.annualInterest,
    })
    if (props.babyBirthYear + 22 < props.ageAtRetirement) {
      result.push({
        ageAtStart: props.babyBirthYear + 23,
        ageAtEnd: props.ageAtRetirement,
        ageAtStartEditable: false,
        assetAtStartEditable: false,
        note: '仕事中心生活',
        income: props.income,
        expense: props.expense,
        annualInterest: props.annualInterest,
      })
    }
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
  result.push(...createPhaseDataAfterRetirement(props))
  return result
}

export function createPhaseDataAfterRetirement(props: PhaseDataForWorkerProps ): PhaseData[] {
  const result: PhaseData[] = []
  if (props.ageAtRetirement < 59) {
    result.push({
      ageAtEnd: 60,
      ageAtStartEditable: false,
      assetAtStartEditable: false,
      note: '年金受給前生活（年金支払いあり）',
      income: 0,
      expense: props.expenseAfterRetirement ? props.expenseAfterRetirement + 25 : props.expense,
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

const expense20MynPerYear = (): PhasesTemplate[] => {
  return [
  {
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
  },
  {
    label:  'サラリーマン・年収600万',
    createPhaseData: () =>
      createPhaseDataForWorker({
        ageAtRetirement: 44,
        income: 460,
        retirementAllowance: 800,
        expense: 240,
        expenseAfterRetirement: 240,
        annuity: 160, // 年金
        assetAtStart: 0,
        annualInterest: 3,
      })
  },
  {
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
  },
  {
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
  },
  {
    label:  '個人事業主・年200万投資',
    createPhaseData: () =>
      createPhaseDataForWorker({
        ageAtRetirement: 45,
        income: 440,
        retirementAllowance: 2000,
        expense: 240,
        expenseAfterRetirement: 240,
        annuity: 74, // 年金
        assetAtStart: 0,
        annualInterest: 3,
      })
  }
  ]
}

const expense25MynPerYear = (): PhasesTemplate[] => {
  return [
    {
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
    },
    {
      label:  'サラリーマン・年収700万',
      createPhaseData: () =>
        createPhaseDataForWorker({
          ageAtRetirement: 47,
          income: 520,
          retirementAllowance: 800,
          expense: 300,
          expenseAfterRetirement: 300,
          annuity: 180, // 年金
          assetAtStart: 0,
          annualInterest: 3,
        })
    },
    {
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
    },
    {
      label:  '個人事業主・年200万投資',
      createPhaseData: () =>
        createPhaseDataForWorker({
          ageAtRetirement: 48,
          income: 500,
          retirementAllowance: 2000,
          expense: 300,
          expenseAfterRetirement: 300,
          annuity: 74, // 年金
          assetAtStart: 0,
          annualInterest: 3,
        })
    }]
}


const expense30MynPerYear = (): PhasesTemplate[] => {
  return [
  {
    label:  'サラリーマン・年収700万',
    createPhaseData: () =>
      createPhaseDataForWorker({
        ageAtRetirement: 52,
        income: 520,
        retirementAllowance: 1500,
        expense: 360,
        expenseAfterRetirement: 360,
        annuity: 190, // 年金
        assetAtStart: 0,
        annualInterest: 3,
      })
  },
  {
    label:  'サラリーマン・年収800万',
    createPhaseData: () =>
      createPhaseDataForWorker({
        ageAtRetirement: 48,
        income: 590,
        retirementAllowance: 1100,
        expense: 360,
        expenseAfterRetirement: 360,
        annuity: 180, // 年金
        assetAtStart: 0,
        annualInterest: 3,
      })
  },
  {
    label:  '個人事業主・年150万投資',
    createPhaseData: () =>
      createPhaseDataForWorker({
        ageAtRetirement: 54,
        income: 510,
        retirementAllowance: 2600,
        expense: 360,
        expenseAfterRetirement: 360,
        annuity: 74, // 年金
        assetAtStart: 0,
        annualInterest: 3,
      })
  },
  {
    label:  '個人事業主・年200万投資',
    createPhaseData: () =>
      createPhaseDataForWorker({
        ageAtRetirement: 51,
        income: 560,
        retirementAllowance: 2200,
        expense: 360,
        expenseAfterRetirement: 360,
        annuity: 74, // 年金
        assetAtStart: 0,
        annualInterest: 3,
      })
  },
  {
    label:  '個人事業主・年250万投資',
    createPhaseData: () =>
      createPhaseDataForWorker({
        ageAtRetirement: 48,
        income: 610,
        retirementAllowance: 1800,
        expense: 360,
        expenseAfterRetirement: 360,
        annuity: 74, // 年金
        assetAtStart: 0,
        annualInterest: 3,
      })
  }]
}

const expense20MynPerYearWithChildren = (): PhasesTemplate[] => {
  return [{
    label: 'サラリーマン・年収600万・子供あり',
    createPhaseData: () =>
      createPhaseDataForWorker({
        ageAtStart: 22,
        ageAtRetirement: 49,
        income: 470,
        retirementAllowance: 800,
        expense: 240,
        expenseAfterRetirement: 240,
        annuity: 160, // 年金
        assetAtStart: 0,
        annualInterest: 3,
        babyCost: 100,
        babyBirthYear: 26,
      })
  },
  {
    label:  '個人事業主・年200万投資',
    createPhaseData: () =>
      createPhaseDataForWorker({
        ageAtRetirement: 51,
        income: 440,
        retirementAllowance: 2000,
        expense: 240,
        expenseAfterRetirement: 240,
        annuity: 74, // 年金
        assetAtStart: 0,
        annualInterest: 3,
        babyCost: 100,
        babyBirthYear: 26,
      })
  }]
}

const expense30MynPerYearWithChildren = (): PhasesTemplate[] => {
  return [{
    label: 'サラリーマン・年収800万・子供あり',
    createPhaseData: () =>
      createPhaseDataForWorker({
        ageAtStart: 22,
        ageAtRetirement: 52,
        income: 590,
        retirementAllowance: 1500,
        expense: 360,
        annuity: 200, // 年金
        assetAtStart: 0,
        annualInterest: 3,
        babyCost: 100,
        babyBirthYear: 26,
      })
  },
  {
    label:  '個人事業主・年250万投資',
    createPhaseData: () =>
      createPhaseDataForWorker({
        ageAtRetirement: 52,
        income: 610,
        retirementAllowance: 2600,
        expense: 360,
        expenseAfterRetirement: 360,
        annuity: 74, // 年金
        assetAtStart: 0,
        annualInterest: 3,
        babyCost: 100,
        babyBirthYear: 26,
      })
  }]
}

export const createDataFromURL = ({nowAge, workingYears, retirementAllowance, income, annuity}
: {
  nowAge?: number,
  workingYears?: number,
  retirementAllowance?: number,
  income?: number,
  annuity? : number,
}): PhaseData[] => {
  return createPhaseDataForWorker({
    ageAtStart: nowAge || 32,
    ageAtRetirement: (nowAge && workingYears) ? (nowAge + workingYears) : 60,
    income: income || 470,
    retirementAllowance: retirementAllowance || 2000,
    expense: income ? income - 100 : 370,
    annuity: annuity || 200, // 年金
    assetAtStart: 0,
    annualInterest: 3,
  })
}

export const templateLabel = (label: string): PhasesTemplate => {
  return {label: ` --- ${label} --- `, createPhaseData: () => undefined}
}

export interface PhasesTemplate {
  label: string,
  createPhaseData?: () => PhaseData[] | undefined,
}

export const phasesTemplates = (pData: boolean): PhasesTemplate[] => {
  const res = [
    templateLabel('月20万円で生活するFIRE'),
    ...expense20MynPerYear(),
    templateLabel('月25万円で生活するFIRE'),
    ...expense25MynPerYear(),
    templateLabel('月30万円で生活するFIRE'),
    ...expense30MynPerYear(),
    // 子供あり
    templateLabel('月20万円で生活するFIRE・子供あり'),
    ...expense20MynPerYearWithChildren(),
    templateLabel('月30万円で生活するFIRE・子供あり'),
    ...expense30MynPerYearWithChildren(),
    templateLabel('おまけ - 平均的なサラリーマン'),
    templateOfNormalSalaryMan,
    templateOfNormalSalaryMan3percent,
  ]
  if (pData) {
    res.push(
      templateLabel('月30万円で生活するFIRE（3%運用）・子供あり'),
      ...financialPDatas(),
    )
  }
  return res
}