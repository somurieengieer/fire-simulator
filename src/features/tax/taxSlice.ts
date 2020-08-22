import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {defaultIncomeAndDeductionSet, taxSetConvert} from "./tax";
import {InnerRetirementTax} from "./retirementTax";

export interface ShowableItem {
  name: string,
  amount?: number | string,
  editable: boolean,
  availableCheckBox?: boolean,
  checked?: boolean,
}
export interface PersonalInfo {
  age: number,
  numberOfFamily: number, // 家族人数（国民健康保険料算出用）
  numberOfFamilyOver40: number, // 家族人数（国民健康保険料算出用）
  workingYears: number, // 労働年数（退職金算定用）
}
export interface RetirementTax extends InnerRetirementTax {
}
export interface TaxSet {
  incomes: Income[],
  baseOfTaxation: number, // 課税標準
  personalInfo: PersonalInfo,
  deductions: Deduction[], // 控除
  socialInsurance: SocialInsurance[], // 社会保険料
  taxableIncomeAmount: number, // 課税所得金額
  personalTax: PersonalTax[], // 税金
  disposableIncome: number, // 可処分所得
  retirementTax: RetirementTax,
}

// 所得
export interface Income {
  name: string,
  amount: number,
  deductions: Deduction[], //控除
}

// 控除
export interface Deduction extends ShowableItem {
}

interface TaxState {
  taxSet: TaxSet[]
}

// 社会保険料
export interface SocialInsurance extends ShowableItem {
}

// 税金
export interface PersonalTax extends ShowableItem {
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
              amount: d.calcAmount(income),
              editable: false,
            }
          })
        ]
      }}),
    personalInfo: {
      age: 30,
      numberOfFamily: 2,
      numberOfFamilyOver40: 0,
      workingYears: 30,
    },
    baseOfTaxation: 0, // 後でアップデートかけるので簡略化するために0とする
    deductions: [
      ...innerSet.deductions,
      ...innerSet.calculatedDeductions.map(d => {return {
        name: d.name,
        amount: 0, // 後でアップデートかけるので簡略化するために0とする
        editable: false,
        availableCheckBox: d.availableCheckBox,
        checked: d.checked,
      }})
    ],
    socialInsurance: [
      ...innerSet.socialInsurance.map(i => {return {
        name: i.name,
        amount: 0, // 後でアップデートかけるので簡略化するために0とする
        editable: false,
      }})
    ],
    taxableIncomeAmount: 0, // 後でアップデートかけるので簡略化するために0とする
    personalTax: [
      ...innerSet.personalTax.map(p => {return {
        name: p.name,
        amount: 0, // 後でアップデートかけるので簡略化するために0とする
        editable: false,
      }})
    ],
    disposableIncome: 0, // 後でアップデートかけるので簡略化するために0とする
    retirementTax: {
      workingYears: 20, // 労働年数
      income: 0, // 退職金（会社支払）
      incomeAutoCalculated: 0, // 退職金（iDeco、小規模企業共済）
      taxAmount: 0, // 退職金税額（所得税・住民税）
      disposableIncome: 0, // 退職金可処分所得
    }
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
