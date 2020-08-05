import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {PhaseClass, PhaseData} from "../../layout/molecules/Phase";
import {CompoundInterestResult} from "../compoundInterest/compoundInterest";

interface FireState {
  phases: PhaseData[],
  compoundInterestResult?: CompoundInterestResult
}

const initialState: FireState = {
    phases: [
      {
        ageAtStart: 22,
        ageAtEnd: 60,
        ageAtStartEditable: true,
        assetAtStartEditable: true,
        income: 500,
        expense: 400,
        assetAtStart: 600,
        annualInterest: 3,
      }
    ],
    compoundInterestResult: undefined
};

const calcCompoundInterest = (state: FireState): CompoundInterestResult => {
  return {
    rowByYear: state.phases
      .flatMap(phase => new PhaseClass(phase).compoundInterestResult().rowByYear)
  }
}

const updateRelatedThings = (state: FireState): void => {
  state.compoundInterestResult = calcCompoundInterest(state)
}

// 初期化処理（ここに書くのは微妙）
updateRelatedThings(initialState)

export const fireSlice = createSlice({
  name: 'fire',
  initialState,
  reducers: {
    updatePhases: (state, action: PayloadAction<PhaseData[]>) => {
      state.phases = action.payload
      updateRelatedThings(state)
    },
  },
});

export const { updatePhases } = fireSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.fire.value)`
export const selectPhases = (state: RootState) => state.fire.phases;
export const selectCompoundInterestResult = (state: RootState) => state.fire.compoundInterestResult;

export default fireSlice.reducer;
