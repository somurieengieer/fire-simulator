import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {PhaseClass, PhaseData, PhasesClass} from "../../layout/molecules/Phase";
import {CompoundInterestResult} from "../compoundInterest/compoundInterest";
import {initialPhasesDefault} from "./fireInitialData";

interface FireState {
  firePatterns: FirePattern[]
}

function createNewPhase(firePattern: FirePattern): PhaseData {
  const lastPhase = firePattern.phases.slice(-1)[0]
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

export interface FirePattern {
  patternNumber: number,
  phases: PhaseData[],
  compoundInterestResult?: CompoundInterestResult,
  hasError?: boolean,
}

const createFirePattern = (patternNumber: number): FirePattern => ({
  patternNumber: patternNumber,
  phases: initialPhasesDefault(),
})

const initialState: FireState = {
  firePatterns: [
    createFirePattern(1),
    createFirePattern(2),
    createFirePattern(3),
  ]
}

const updateRelatedThings = (state: FireState): void => {
  state.firePatterns.map(p => updateFirePatternRelatedThings(p))
}
const updateFirePatternRelatedThings = (firePattern: FirePattern): void => {
  firePattern.hasError = hasError(firePattern)
  if (firePattern.hasError) {
    return
  }

  for (let i = 1; i < firePattern.phases.length; i++) {
    console.log(firePattern.phases[i])
    firePattern.phases[i].assetAtStart = (new PhaseClass(firePattern.phases[i-1])).assetAtEnd()
    firePattern.phases[i].ageAtStart = Number(firePattern.phases[i-1].ageAtEnd) + 1
  }
  firePattern.compoundInterestResult = new PhasesClass(firePattern.phases.map(data => new PhaseClass(data))).compoundInterestResult()
}
function hasError(firePattern: FirePattern): boolean {
  if (firePattern.phases.find(phase => !phase.ageAtStart || !phase.ageAtEnd)) return true
  // @ts-ignore
  if (firePattern.phases.find(phase => phase.ageAtStart > phase.ageAtEnd)) return true
  if (firePattern.phases.find(phase => !phase.annualInterest && phase.annualInterest != 0)) return true
  return false
}


// TODO: 初期化処理（ここに書くのは微妙）
updateRelatedThings(initialState)

export const fireSlice = createSlice({
  name: 'fire',
  initialState: (function() {
    // TODO: 初期データ生成タイミングでupdateしておきたい（複利計算等）
    // updateRelatedThings(initialState)
    return initialState
  })(),
  reducers: {
    updatePhases: (state, action: PayloadAction<FirePattern>) => {
      const patternNumber= action.payload.patternNumber
      const updatedPhases = action.payload.phases
      if (updatedPhases.length > 2) {
        console.log('payload length > 2', updatedPhases[1])
        updatedPhases[1].assetAtStart = 0
      }

      state.firePatterns
        .filter(p => p.patternNumber === patternNumber)
        .forEach(p => p.phases = updatedPhases)

      updateRelatedThings(state)
    },
    addPhase: (state, action: PayloadAction<number>) => {
      // PayloadはPatternNumber。Indexは -1 する
      const firePatternIndex = action.payload - 1
      const targetFirePattern = state.firePatterns[firePatternIndex]
      targetFirePattern.phases.push(createNewPhase(targetFirePattern))
      updateRelatedThings(state)
    }
  },
});

export const { updatePhases, addPhase } = fireSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.fire.value)`
export const selectFirePatterns = (state: RootState) => state.fire.firePatterns;
export const selectPatternNumbers = (state: RootState) => state.fire.firePatterns.map((p: FirePattern) => p.patternNumber);

export default fireSlice.reducer;
