import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {defaultIncomeAndDeductionSet, TaxSet} from "./tax";

interface TaxState {
  incomeAndDeductionSet: TaxSet[]
}

const initialState: TaxState = {
  incomeAndDeductionSet: [defaultIncomeAndDeductionSet()]
}

export const taxSlice = createSlice({
  name: 'tax',
  initialState: (function() {
    // TODO: 初期データ生成タイミングでupdateしておきたい（複利計算等）
    // updateRelatedThings(initialState)
    return initialState
  })(),
  reducers: {
    updateTaxSet: (state, action: PayloadAction<{incomeAndDeductionSet: TaxSet, index: number}>) => {
      state.incomeAndDeductionSet[action.payload.index] = action.payload.incomeAndDeductionSet
    },
  },
});

export const { updateTaxSet } = taxSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.tax.value)`
export const selectTaxSet = (state: RootState) => state.tax.incomeAndDeductionSet;

export default taxSlice.reducer;
