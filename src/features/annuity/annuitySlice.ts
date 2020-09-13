import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import {updateForAnnuity} from './annuity'
import {sum} from '../utils/Utils'

export interface AnnuityForBase {
  paymentYear: number,
  annuity: number,
}

export interface AnnuityForEmployee {
  paymentYear: number,
  averageSalary: number,
}

export interface AnnuitySet {
  setNumber: number,
  base: AnnuityForBase,
  employees: AnnuityForEmployee[],
  employeesAnnuity: number,
  totalPaidAnnuity: number,
  totalPaidAnnuityIncludingCompany: number, // 法人支払い分も含む
  totalEstimatedAnnuity: number,
}

export interface AnnuityState {
  annuitySet: AnnuitySet[],
}

const createInitialData = (setNumber: number) => {
  return {
    setNumber: setNumber,
    base: {
      paymentYear: 10, annuity: 0
    },
    employees: [
      { paymentYear: 10, averageSalary: 600 },
      { paymentYear: 20, averageSalary: 300 },
      { paymentYear: 0, averageSalary: 0 },
      { paymentYear: 0, averageSalary: 0 }
    ],
    employeesAnnuity: 0,
    totalPaidAnnuity: 0,
    totalPaidAnnuityIncludingCompany: 0,
    totalEstimatedAnnuity: 0
  }
}
const createInitialData2 = (setNumber: number) => {
  return {
    setNumber: setNumber,
    base: {
      paymentYear: 0, annuity: 0
    },
    employees: [
      { paymentYear: 40, averageSalary: 600 },
      { paymentYear: 0, averageSalary: 0 },
      { paymentYear: 0, averageSalary: 0 },
      { paymentYear: 0, averageSalary: 0 }
    ],
    employeesAnnuity: 0,
    totalPaidAnnuity: 0,
    totalPaidAnnuityIncludingCompany: 0,
    totalEstimatedAnnuity: 0
  }
}
const createInitialData3 = (setNumber: number) => {
  return {
    setNumber: setNumber,
    base: {
      paymentYear: 40, annuity: 0
    },
    employees: [
      { paymentYear: 0, averageSalary: 0 },
      { paymentYear: 0, averageSalary: 0 },
      { paymentYear: 0, averageSalary: 0 },
      { paymentYear: 0, averageSalary: 0 }
    ],
    employeesAnnuity: 0,
    totalPaidAnnuity: 0,
    totalPaidAnnuityIncludingCompany: 0,
    totalEstimatedAnnuity: 0
  }
}

const initialState: AnnuityState = {
  annuitySet: [
    createInitialData(1),
    createInitialData2(2),
    createInitialData3(3)
  ]
}

const calcAnnuity = (annuitySet: AnnuitySet): AnnuitySet => {
  const paymentYearForEmployee = sum(annuitySet.employees.map(e => e.paymentYear))
  const calcedAnnuity = updateForAnnuity({
    paymentYearForBase: annuitySet.base.paymentYear,
    paymentYearForEmployee: paymentYearForEmployee,
    averageStandardSalary: sum(annuitySet.employees.map(e => e.averageSalary * e.paymentYear / paymentYearForEmployee))
  })
  annuitySet.base.annuity = calcedAnnuity.annuityForBase || 0
  annuitySet.employeesAnnuity = calcedAnnuity.annuityForEmployee || 0

  annuitySet.totalPaidAnnuity = annuitySet.base.paymentYear * 19.845 +
    sum(annuitySet.employees.map(e => Math.min(e.averageSalary * 0.0915, 68.076) * e.paymentYear))
  annuitySet.totalPaidAnnuityIncludingCompany = annuitySet.base.paymentYear * 19.845 +
    sum(annuitySet.employees.map(e => Math.min(e.averageSalary * 0.0915, 68.076) * 2 * e.paymentYear))
  // 65〜84歳年金受取
  annuitySet.totalEstimatedAnnuity = (annuitySet.base.annuity + annuitySet.employeesAnnuity) * 20

  return annuitySet
}

export const annuitySlice = createSlice({
  name: 'annuity',
  initialState: (function () {
    initialState.annuitySet.forEach(s => calcAnnuity(s))
    return initialState
  })(),
  reducers: {
    updateAnnuity: (state, action: PayloadAction<AnnuitySet>) => {
      const calcedAnnuiy = calcAnnuity(action.payload)
      state.annuitySet[action.payload.setNumber - 1] = calcedAnnuiy
    }
  }
})

export const { updateAnnuity } = annuitySlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.annuity.value)`
export const selectAnnuity = (state: RootState) => JSON.parse(JSON.stringify(state.annuity.annuitySet)) as AnnuitySet[]

export default annuitySlice.reducer
