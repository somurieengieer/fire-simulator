import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {defaultIncomeAndDeductionSet, InnerEditableDeduction, taxSetConvert} from "./tax";

export interface TaxSet {
  incomes: Income[],
  baseOfTaxation: number,
  deductions: Deduction[], //控除
}

// 所得
export interface Income {
  name: string,
  amount: number,
  deductions: Deduction[], //控除
}

// 控除
export interface Deduction extends InnerEditableDeduction {
}

interface TaxState {
  taxSet: TaxSet[]
}

// 内部的クラスから表示用JSONに変換
const createTaxSet = (): TaxSet => {
  const innerSet = defaultIncomeAndDeductionSet()
  return update({
    incomes:
      innerSet.incomes.map(income => {return {
        name: income.name,
        amount: income.amount,
        deductions: [
          ...income.deductions,
          ...income.calculatedDeductions.map(d => {
            return {
              name: d.name,
              amount: d.calcAmount(income.amount),
              editable: false,
            }
          })
        ]
      }}),
    baseOfTaxation: 0, // 後でアップデートかけるので簡略化するために0とする
    deductions: [
      ...innerSet.deductions,
      ...innerSet.calculatedDeductions.map(d => {return {
        name: d.name,
        amount: d.calcAmount(0),
        editable: false,
      }})
    ]
  })
}

// 表示用JSONの値変更時に自動導出値を更新する
const update = (taxSet: TaxSet): TaxSet => {
  return taxSetConvert(taxSet)
}

const initialState: TaxState = {
  taxSet: [createTaxSet()]
}

export const taxSlice = createSlice({
  name: 'tax',
  initialState: (function() {
    // TODO: 初期データ生成タイミングでupdateしておきたい（複利計算等）
    // updateRelatedThings(initialState)
    return initialState
  })(),
  reducers: {
    updateTaxSet: (state, action: PayloadAction<{taxSet: TaxSet, index: number}>) => {
      state.taxSet[action.payload.index] = update(action.payload.taxSet)
    },
  },
});

export const { updateTaxSet } = taxSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.tax.value)`
export const selectTaxSet = (state: RootState) => state.tax.taxSet;

export default taxSlice.reducer;
