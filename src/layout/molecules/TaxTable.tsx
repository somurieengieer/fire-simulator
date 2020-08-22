import React from 'react';
import {Grid, Paper, Table, TableBody, TableContainer} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {usePatternTableStyles} from "./PhaseTableItems";
import {theme} from "../materialui/theme";
import {TaxHeaderRowSet, TaxIncomeTableRowSet, TaxSubHeaderRowSet} from "./TaxTableItems";
import {Deduction, Income, TaxSet, updateTaxSet} from "../../features/tax/taxSlice"
import {useDispatch} from "react-redux";
import {sumAmount} from "../../features/utils/Utils";

const useStyles = makeStyles({
  root: {
    margin: 5,
    padding: theme.spacing(0.5),
  }
});

interface PhasesTableProps {
  taxSetIndex: number,
  taxSet: TaxSet,
}

export function TaxTable({taxSetIndex, taxSet}: PhasesTableProps) {

  const classes = useStyles();
  const tableClasses = usePatternTableStyles();
  const dispatch = useDispatch();

  const updateTaxSetItem = (updateValue: (set: TaxSet) => void) => {
    const newTaxSet = JSON.parse(JSON.stringify(taxSet)) as TaxSet
    updateValue(newTaxSet)
    dispatch(updateTaxSet({taxSet: newTaxSet, index: taxSetIndex}))
  }

  const updateIncomeDeductions = (incomeIndex: number, index: number, updatedValue: any): void => {
    const newTaxSet = JSON.parse(JSON.stringify(taxSet))
    newTaxSet.incomes[incomeIndex].deductions[index] = updatedValue
    dispatch(updateTaxSet({taxSet: newTaxSet, index: taxSetIndex}))
  }

  const updateIncome = (incomeIndex: number, updatedValue: string): void => {
    const newIncomeAndDeductionSet = JSON.parse(JSON.stringify(taxSet))
    newIncomeAndDeductionSet.incomes[incomeIndex].amount = updatedValue
    dispatch(updateTaxSet({taxSet: newIncomeAndDeductionSet, index: taxSetIndex}))
  }

  const updateDeduction = (deductionIndex: number, updatedValue: string): void => {
    const newTaxSet = JSON.parse(JSON.stringify(taxSet))
    newTaxSet.deductions[deductionIndex].amount = updatedValue
    dispatch(updateTaxSet({taxSet: newTaxSet, index: taxSetIndex}))
  }

  const updateDeductionChecked = (deductionIndex: number, updatedValue: boolean): void => {
    const newTaxSet = JSON.parse(JSON.stringify(taxSet))
    newTaxSet.deductions[deductionIndex].checked = updatedValue
    dispatch(updateTaxSet({taxSet: newTaxSet, index: taxSetIndex}))

  }

  return (
    <>
      <Grid  className={classes.root}>
          <TableContainer component={Paper}>
            <Table className={tableClasses.table} aria-label="simple table"
                   size={'small'}
            >
              <TaxHeaderRowSet title={'パターン１〜などの列タイトル'} />
              <TableBody>
                <TaxSubHeaderRowSet title={'個人設定'} />
                <TaxIncomeTableRowSet rowLabel={'年齢'}
                                      value={taxSet.personalInfo.age}
                                      onChange={v => updateTaxSetItem(set => {set.personalInfo.age = Number(v)})}
                />
                <TaxIncomeTableRowSet rowLabel={'家族人数（40歳未満）'}
                                      value={taxSet.personalInfo.numberOfFamily}
                                      onChange={v => updateTaxSetItem(set => {set.personalInfo.numberOfFamily = Number(v)})}
                />
                <TaxIncomeTableRowSet rowLabel={'家族人数（40歳以上）'}
                                      value={taxSet.personalInfo.numberOfFamilyOver40}
                                      onChange={v => updateTaxSetItem(set => {set.personalInfo.numberOfFamilyOver40 = Number(v)})}
                />
                <TaxSubHeaderRowSet title={'所得'} amount={sumAmount(taxSet.incomes)} />
                {taxSet.incomes.map((income: Income, incomeIndex: number) => (
                  <>
                    <TaxIncomeTableRowSet rowLabel={income.name}
                                          value={income.amount || ''}
                                          onChange={v => updateIncome(incomeIndex, v)}
                    />
                    {income.deductions && income.deductions.map((deduction, i) => (
                      <TaxIncomeTableRowSet rowLabel={deduction.name}
                                            value={deduction.amount || ''}
                                            onChange={v => updateIncomeDeductions(incomeIndex, i, v)}
                                            disabled={!deduction.editable}
                      />
                    ))}
                  </>
                  ))}
                <TaxSubHeaderRowSet title={'課税標準'} />
                <TaxIncomeTableRowSet rowLabel={'課税標準'}
                                      value={taxSet.baseOfTaxation || ''}
                                      disabled={true}
                />
                <TaxSubHeaderRowSet title={'控除'} amount={sumAmount(taxSet.deductions)} />
                {taxSet.deductions.map((deduction: Deduction, deductionIndex: number) => (
                  <TaxIncomeTableRowSet rowLabel={deduction.name}
                                        value={deduction.amount || ''}
                                        onChange={v => updateDeduction(deductionIndex, v)}
                                        availableCheckBox={deduction.availableCheckBox}
                                        checkValue={deduction.checked}
                                        onChangeCheck={v => updateDeductionChecked(deductionIndex, v)}
                                        disabled={!deduction.editable}
                  />
                  ))}
                <TaxSubHeaderRowSet title={'社会保険料'} amount={sumAmount(taxSet.socialInsurance)} />
                {taxSet.socialInsurance.map((socialInsurance) => (
                  <TaxIncomeTableRowSet rowLabel={socialInsurance.name}
                                        value={socialInsurance.amount || ''}
                                        disabled={true}
                  />
                ))}
                <TaxSubHeaderRowSet title={'課税所得金額'} />
                <TaxIncomeTableRowSet rowLabel={'課税所得金額'}
                                      value={taxSet.taxableIncomeAmount || ''}
                                      disabled={true}
                />
                <TaxSubHeaderRowSet title={'税金'} amount={sumAmount(taxSet.personalTax)} />
                {taxSet.personalTax.map((personalTax) => (
                  <TaxIncomeTableRowSet rowLabel={personalTax.name}
                                        value={personalTax.amount || ''}
                                        disabled={true}
                  />
                ))}
                <TaxSubHeaderRowSet title={'可処分所得'} />
                <TaxIncomeTableRowSet rowLabel={'可処分所得'}
                                      value={taxSet.disposableIncome}
                                      disabled={true}
                />
                <TaxSubHeaderRowSet title={'退職金'} />
                <TaxIncomeTableRowSet rowLabel={'労働年数'}
                                      value={taxSet.retirementTax.workingYears}
                                      onChange={v => updateTaxSetItem(taxSet => taxSet.retirementTax.workingYears = Number(v))}
                />
                <TaxIncomeTableRowSet rowLabel={'退職金（会社支払）'}
                                      value={taxSet.retirementTax.income}
                                      onChange={v => updateTaxSetItem(taxSet => taxSet.retirementTax.workingYears = Number(v))}
                />
                <TaxIncomeTableRowSet rowLabel={'退職金（iDeco、小規模企業共済）'}
                                      value={taxSet.retirementTax.incomeAutoCalculated}
                                      disabled={true}
                />
                <TaxIncomeTableRowSet rowLabel={'税額（所得税・住民税）'}
                                      value={taxSet.retirementTax.taxAmount}
                                      disabled={true}
                />
                <TaxIncomeTableRowSet rowLabel={'退職金可処分所得'}
                                      value={taxSet.retirementTax.disposableIncome}
                                      disabled={true}
                />
              </TableBody>
            </Table>
          </TableContainer>
      </Grid>
    </>
  );
}

