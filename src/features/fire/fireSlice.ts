import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {PhaseClass, PhaseData, PhasesClass} from "../../layout/molecules/Phase";
import {CompoundInterestResult} from "../compoundInterest/compoundInterest";

interface FireState {
  phases: PhaseData[],
  compoundInterestResult?: CompoundInterestResult,
  hasError: boolean,
}

function createNewPhase(state: FireState): PhaseData {
  const lastPhase = state.phases.slice(-1)[0]
  return {
    ageAtStart: Number(lastPhase.ageAtEnd || 0) + 1,
    ageAtEnd: Number(lastPhase.ageAtEnd || 0) + 11,
    ageAtStartEditable: false,
    assetAtStartEditable: false,
    income: lastPhase.income,
    expense: lastPhase.expense,
    assetAtStart: lastPhase.assetAtStart,
    annualInterest: lastPhase.annualInterest,
  }
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
  compoundInterestResult: undefined,
  hasError: false,
};

const updateRelatedThings = (state: FireState): void => {
  state.hasError = hasError(state)
  if (state.hasError) {
    return
  }

  for (let i = 1; i < state.phases.length; i++) {
    console.log(state.phases[i])
    state.phases[i].assetAtStart = (new PhaseClass(state.phases[i-1])).assetAtEnd()
    state.phases[i].ageAtStart = Number(state.phases[i-1].ageAtEnd) + 1
  }
  state.compoundInterestResult = new PhasesClass(state.phases.map(data => new PhaseClass(data))).compoundInterestResult()
}
function hasError(state: FireState): boolean {
  if (state.phases.find(phase => !phase.ageAtStart || !phase.ageAtEnd)) return true
  // @ts-ignore
  if (state.phases.find(phase => phase.ageAtStart > phase.ageAtEnd)) return true
  if (state.phases.find(phase => !phase.annualInterest && phase.annualInterest != 0)) return true
  return false
}

// 初期化処理（ここに書くのは微妙）
// updateRelatedThings(initialState)

export const fireSlice = createSlice({
  name: 'fire',
  initialState: (function() {
    // TODO: 初期データ生成タイミングでupdateしておきたい（複利計算等）
    // updateRelatedThings(initialState)
    return initialState
  })(),
  reducers: {
    updatePhases: (state, action: PayloadAction<PhaseData[]>) => {
      if (action.payload.length > 2) {
        console.log('payload length > 2', action.payload[1])
        action.payload[1].assetAtStart = 0
      }
      state.phases = action.payload
      updateRelatedThings(state)
    },
    addPhase: (state) => {
      state.phases.push(createNewPhase(state))
      updateRelatedThings(state)
    }
  },
});

export const { updatePhases, addPhase } = fireSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.fire.value)`
export const selectPhases = (state: RootState) => state.fire.phases;
export const selectCompoundInterestResult = (state: RootState) => state.fire.compoundInterestResult;
export const selectHasError = (state: RootState) => state.fire.hasError;

export default fireSlice.reducer;
