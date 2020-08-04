import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {PhaseData} from "../../layout/molecules/Phase";

interface FireState {
  phases: PhaseData[]
}

const initialState: FireState = {
  phases: [
    { ageAtStart: 22,
      ageAtEnd: 60,
      ageAtStartEditable: true,
      assetAtStartEditable: true,
      income: 500,
      expense: 400,
      assetAtStart: 600,
      annualInterest: 3,
    }
  ]
};



export const fireSlice = createSlice({
  name: 'fire',
  initialState,
  reducers: {
    updatePhases: (state, action: PayloadAction<PhaseData[]>) => {
      state.phases = action.payload
    },
  },
});

export const { updatePhases } = fireSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.fire.value)`
export const selectPhases = (state: RootState) => state.fire.phases;

export default fireSlice.reducer;
