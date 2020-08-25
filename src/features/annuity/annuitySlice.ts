import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {updateForAnnuity} from "./annuity";
import {sum} from "../utils/Utils";

export interface AnnuityForBase {
  paymentYear: number,
  annuity: number,
}
export interface AnnuityForEmployee {
  paymentYear: number,
  averageSalary: number,
}
export interface AnnuitySet {
  base: AnnuityForBase,
  employees: AnnuityForEmployee[],
  employeesAnnuity: number,
}

export interface AnnuityState {
  annuitySet: AnnuitySet,
}

const initialState: AnnuityState = {
  annuitySet: {
    base: {
      paymentYear: 10,
      annuity: 0,
    },
    employees: [
      {
        paymentYear: 10,
        averageSalary: 600,
      },
      {
        paymentYear: 20,
        averageSalary: 300,
      }
    ],
    employeesAnnuity: 0,
  }
}

const calcAnnuity = (annuitySet: AnnuitySet): AnnuitySet => {
  const paymentYearForEmployee = sum(annuitySet.employees.map(e => e.paymentYear))
  const calcedAnnuity = updateForAnnuity({
    paymentYearForBase: annuitySet.base.paymentYear,
    paymentYearForEmployee: paymentYearForEmployee,
    averageStandardSalary: sum(annuitySet.employees.map(e => e.averageSalary * e.paymentYear / paymentYearForEmployee)),
  })
  annuitySet.base.annuity = calcedAnnuity.annuityForBase || 0
  annuitySet.employeesAnnuity = calcedAnnuity.annuityForEmployee || 0
  return annuitySet
}

export const annuitySlice = createSlice({
  name: 'annuity',
  initialState: (function() {
    calcAnnuity(initialState.annuitySet)
    return initialState
  })(),
  reducers: {
    updateAnnuity: (state, action: PayloadAction<AnnuitySet>) => {
      console.log('updateAnnuity', calcAnnuity(action.payload))
      const calcedAnnuiy = calcAnnuity(action.payload)
      state.annuitySet = calcedAnnuiy
      // state.base = calcedAnnuiy.base
      // state.employees = calcedAnnuiy.employees
      // state.employeesAnnuity = calcedAnnuiy.employeesAnnuity
    },
  },
});

export const { updateAnnuity} = annuitySlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.annuity.value)`
export const selectAnnuity = (state: RootState) => JSON.parse(JSON.stringify(state.annuity.annuitySet)) as AnnuitySet

export default annuitySlice.reducer;
