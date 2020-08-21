import React from 'react';
import {Grid, Paper, Table, TableBody, TableContainer} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {usePatternTableStyles} from "./PhaseTableItems";
import {theme} from "../materialui/theme";
import {TaxHeaderRowSet, TaxIncomeTableRowSet, TaxSubHeaderRowSet} from "./TaxTableItems";
import {Deduction, Income, TaxSet, updateTaxSet} from "../../features/tax/taxSlice"
import {useDispatch} from "react-redux";

const useStyles = makeStyles({
  root: {
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 5,
    padding: theme.spacing(0.5),
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    }
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

  const updateIncomeDeductions = (incomeIndex: number, index: number, updatedValue: any): void => {
    const newTaxSet = JSON.parse(JSON.stringify(taxSet))
    newTaxSet.incomes[incomeIndex].deductions[index] = updatedValue
    dispatch(updateTaxSet({taxSet: newTaxSet, index: taxSetIndex}))
  }

  const updateIncome = (incomeIndex: number, updatedValue: any): void => {
    console.log('updatedIncome called', taxSet, incomeIndex, updatedValue)
    const newIncomeAndDeductionSet = JSON.parse(JSON.stringify(taxSet))
    newIncomeAndDeductionSet.incomes[incomeIndex].amount = updatedValue
    dispatch(updateTaxSet({taxSet: newIncomeAndDeductionSet, index: taxSetIndex}))
  }

  const updateDeduction = (deductionIndex: number, updatedValue: any): void => {
    const newTaxSet = JSON.parse(JSON.stringify(taxSet))
    newTaxSet.deductions[deductionIndex].amount = updatedValue
    dispatch(updateTaxSet({taxSet: newTaxSet, index: taxSetIndex}))
  }

  const updateChecked = (incomeIndex: number, index: number, updatedValue: any): void => {

  }

  return (
    <>
      <Grid  className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={7}>
            <TableContainer component={Paper}>
              <Table className={tableClasses.table} aria-label="simple table"
                     size={'small'}
              >

                <TaxHeaderRowSet title={'パターン１〜などの列タイトル'} />
                <TableBody>
                  <TaxSubHeaderRowSet title={'所得'} />
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
                                              onChangeCheck={v => updateChecked(incomeIndex, i, v)}
                                              disabled={!deduction.editable}
                        />
                      ))}
                    </>
                    ))}
                  {/*<SubHeaderRowSet title={'収入'} colSpan={titleColSpan()} />*/}
                  {/*<TableRowSet rowLabel={'手取り'}*/}
                  {/*             phaseClasses={phases}*/}
                  {/*             valueCallback={p => p.income}*/}
                  {/*             onChange={(newValue, i) => updateIncomeDeductions(i, 'income', newValue)} />*/}
                  <TaxSubHeaderRowSet title={'課税標準'} />
                  <TaxIncomeTableRowSet rowLabel={'課税標準'}
                                        value={taxSet.baseOfTaxation || ''}
                                        disabled={true}
                  />
                  <TaxSubHeaderRowSet title={'控除'} />
                  {taxSet.deductions.map((deduction: Deduction, deductionIndex: number) => (
                    <TaxIncomeTableRowSet rowLabel={deduction.name}
                                          value={deduction.amount || ''}
                                          onChange={v => updateDeduction(deductionIndex, v)}
                                          disabled={!deduction.editable}
                    />
                    ))}
                  <TaxSubHeaderRowSet title={'社会保険料'} />
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
                  <TaxSubHeaderRowSet title={'税金'} />
                  {taxSet.personalTax.map((personalTax) => (
                    <TaxIncomeTableRowSet rowLabel={personalTax.name}
                                          value={personalTax.amount || ''}
                                          disabled={true}
                    />
                  ))}
                  <TaxSubHeaderRowSet title={'可処分所得（社会保険・税引後金額）'} />
                  <TaxIncomeTableRowSet rowLabel={'可処分所得'}
                                        value={taxSet.disposableIncome}
                                        disabled={true}
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

