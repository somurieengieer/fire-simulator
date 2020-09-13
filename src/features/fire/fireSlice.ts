import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import {PhaseClass, PhaseData, PhasesClass} from './Phase'
import {CompoundInterestResult} from '../compoundInterest/compoundInterest'
import {initialPhasesDefault} from './fireInitialData'

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
    note: '',
    income: lastPhase.income,
    expense: lastPhase.expense,
    assetAtStart: lastPhase.assetAtStart,
    annualInterest: lastPhase.annualInterest
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
  phases: initialPhasesDefault()
})

const initialState: FireState = {
  firePatterns: [
    createFirePattern(1),
    createFirePattern(2),
    createFirePattern(3)
  ]
}

const updateRelatedThings = (state: FireState): void => {
  state.firePatterns.map(p => updateFirePatternRelatedThings(p))
}
export const updateFirePatternRelatedThings = (firePattern: FirePattern): void => {
  firePattern.phases[0].ageAtStartEditable = true
  firePattern.phases[0].assetAtStartEditable = true
  for (let i = 1; i < firePattern.phases.length; i++) {
    firePattern.phases[i].ageAtStart = Number(firePattern.phases[i - 1].ageAtEnd) + 1
    firePattern.phases[i].ageAtStartEditable = false
    firePattern.phases[i].assetAtStartEditable = false
  }

  firePattern.hasError = hasError(firePattern)
  if (firePattern.hasError) {
    return
  }

  for (let i = 1; i < firePattern.phases.length; i++) {
    firePattern.phases[i].assetAtStart = (new PhaseClass(firePattern.phases[i - 1])).assetAtEnd()
  }
  firePattern.compoundInterestResult = new PhasesClass(firePattern.phases.map(data => new PhaseClass(data))).compoundInterestResult()
}

function hasError(firePattern: FirePattern): boolean {
  if (!firePattern.phases[0].ageAtStart) {
    console.log('hasError, ageAtStart does not set. firePattern=', firePattern.patternNumber, ', ageAtStart=', firePattern.phases[0].ageAtStart)
    return true
  }
  if (firePattern.phases.find(phase => !phase.ageAtEnd)) {
    console.log('hasError, ageAtEnd does not set. firePattern=', firePattern.patternNumber, 'ageAtEnd', firePattern.phases.map(p => p.ageAtEnd))
    return true
  }
  // @ts-ignore
  if (firePattern.phases.find(phase => phase.ageAtStart > phase.ageAtEnd)) {
    console.log('hasError, ageAtStart > ageAtEnd. firePattern=', firePattern.patternNumber, 'ageAtStart', firePattern.phases.map(p => p.ageAtStart), 'ageAtEnd', firePattern.phases.map(p => p.ageAtEnd))
    return true
  }
  if (firePattern.phases.find(phase => !phase.annualInterest && phase.annualInterest !== 0)) {
    console.log('hasError, annualInterest does not set. firePattern=', firePattern.patternNumber, 'annualInterest', firePattern.phases.map(p => p.annualInterest))
    return true
  }
  return false
}

// TODO: 初期化処理（ここに書くのは微妙）
updateRelatedThings(initialState)

export const fireSlice = createSlice({
  name: 'fire',
  initialState: (function () {
    // TODO: 初期データ生成タイミングでupdateしておきたい（複利計算等）
    // updateRelatedThings(initialState)
    return initialState
  })(),
  reducers: {
    updatePhases: (state, action: PayloadAction<FirePattern>) => {
      const patternNumber = action.payload.patternNumber
      const updatedPhases = action.payload.phases

      state.firePatterns
        .filter(p => p.patternNumber === patternNumber)
        .forEach(p => p.phases = updatedPhases)

      updateRelatedThings(state)
    },
    deletePhase: (state, action: PayloadAction<{ patternNumber: number, phaseIndex: number }>) => {
      const patternIndex = action.payload.patternNumber - 1
      const phaseIndex = action.payload.phaseIndex
      state.firePatterns[patternIndex].phases.splice(phaseIndex, 1)
      state.firePatterns[patternIndex].phases[0].assetAtStart = Number(Number(state.firePatterns[patternIndex].phases[0].assetAtStart).toFixed(0))
      updateRelatedThings(state)
    },
    addPhase: (state, action: PayloadAction<{ patternNumber: number, phaseIndex?: number }>) => {
      const firePatternIndex = action.payload.patternNumber - 1
      const targetFirePattern = state.firePatterns[firePatternIndex]

      const phaseIndex = action.payload.phaseIndex
      if (phaseIndex === undefined) {
        targetFirePattern.phases.push(createNewPhase(targetFirePattern))
      } else {
        const rightPhase = targetFirePattern.phases[phaseIndex]
        const leftPhase = phaseIndex > 0 && targetFirePattern.phases[phaseIndex - 1]
        if (rightPhase.ageAtStart !== rightPhase.ageAtEnd) {
          const newPhase = JSON.parse(JSON.stringify(rightPhase))
          rightPhase.ageAtStart = Number(rightPhase.ageAtStart) + 1
          newPhase.ageAtEnd = newPhase.ageAtStart
          targetFirePattern.phases.splice(phaseIndex, 0, newPhase)
        } else if (leftPhase && leftPhase.ageAtStart !== leftPhase.ageAtEnd) {
          const newPhase = JSON.parse(JSON.stringify(leftPhase))
          leftPhase.ageAtEnd = Number(leftPhase.ageAtEnd) - 1
          newPhase.ageAtStart = newPhase.ageAtEnd
          targetFirePattern.phases.splice(phaseIndex, 0, newPhase)
        }
        updateRelatedThings(state)
      }
    }
  }
})

export const {updatePhases, deletePhase, addPhase} = fireSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.fire.value)`
export const selectFirePatterns = (state: RootState) => state.fire.firePatterns
export const selectPatternNumbers = (state: RootState) => state.fire.firePatterns.map((p: FirePattern) => p.patternNumber)

export default fireSlice.reducer
