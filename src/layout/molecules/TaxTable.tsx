import React from 'react';
import {Grid, Paper, Table, TableBody, TableContainer} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {usePatternTableStyles} from "./PhaseTableItems";
import {theme} from "../materialui/theme";
import {TaxHeaderRowSet, TaxIncomeTableRowSet, TaxSubHeaderRowSet} from "./TaxTableItems";
import {Income, TaxSet, updateTaxSet} from "../../features/tax/taxSlice"
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
  incomeAndDeductionSetIndex: number,
  taxSet: TaxSet,
}

export function TaxTable({incomeAndDeductionSetIndex, taxSet}: PhasesTableProps) {

  const classes = useStyles();
  const tableClasses = usePatternTableStyles();
  const dispatch = useDispatch();

  const updateDeductions = (incomeIndex: number, index: number, updatedValue: any): void => {
    const newTaxSet = JSON.parse(JSON.stringify(taxSet))
    // @ts-ignore
    newTaxSet.incomes[incomeIndex].deductions[index] = updatedValue
    dispatch(updateTaxSet({taxSet: newTaxSet, index: incomeAndDeductionSetIndex}))
  }

  const updateIncome = (incomeIndex: number, updatedValue: any): void => {
    console.log('updatedIncome called', taxSet, incomeIndex, updatedValue)
    const newIncomeAndDeductionSet = JSON.parse(JSON.stringify(taxSet))
    newIncomeAndDeductionSet.incomes[incomeIndex].amount = updatedValue
    dispatch(updateTaxSet({taxSet: newIncomeAndDeductionSet, index: incomeAndDeductionSetIndex}))
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

                <TaxHeaderRowSet title={'タイトル'} />
                <TableBody>
                  <TaxSubHeaderRowSet title={'サブタイトル'} />
                  {taxSet.incomes.map((income: Income, incomeIndex: number) => (
                    <>
                      <TaxIncomeTableRowSet rowLabel={income.name}
                                            value={income.amount || ''}
                                            onChange={v => updateIncome(incomeIndex, v)}
                      />
                      {income.deductions && income.deductions.map((deduction, i) => (
                        <TaxIncomeTableRowSet rowLabel={deduction.name}
                                              value={deduction.amount || ''}
                                              onChange={v => updateDeductions(incomeIndex, i, v)}
                                              onChangeCheck={v => updateChecked(incomeIndex, i, v)}
                                              disabled={!deduction.editable}
                        />
                      ))}
                      {/*<TableCell className={tableClasses.tableCell} align="center">*/}
                      {/*  {income.}*/}
                      {/*</TableCell>*/}
                    </>
                    ))}
                  {/*<SubHeaderRowSet title={'収入'} colSpan={titleColSpan()} />*/}
                  {/*<TableRowSet rowLabel={'手取り'}*/}
                  {/*             phaseClasses={phases}*/}
                  {/*             valueCallback={p => p.income}*/}
                  {/*             onChange={(newValue, i) => updateDeductions(i, 'income', newValue)} />*/}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

