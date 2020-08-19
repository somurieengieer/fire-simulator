import React from 'react';
import {Grid, Paper, Table, TableBody, TableContainer} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {usePatternTableStyles} from "./PhaseTableItems";
import {theme} from "../materialui/theme";
import {Income, IncomeAndDeductionSet} from "../../features/tax/tax";
import {TaxHeaderRowSet, TaxIncomeTableRowSet, TaxSubHeaderRowSet} from "./TaxTableItems";

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
  incomeAndDeductionSet: IncomeAndDeductionSet,
}

export function TaxTable({incomeAndDeductionSet}: PhasesTableProps) {

  const classes = useStyles();
  const tableClasses = usePatternTableStyles();
  // const dispatch = useDispatch();

  const update = (incomeIndex: number, index: number, updatedValue: any): void => {

    // const newData = Object.assign({}, phases[index])
    // @ts-ignore
    // newData[key] = updatedValue
    // const newFirePattern = JSON.parse(JSON.stringify(firePattern))
    // newFirePattern.phases[index] = newData
    // dispatch(updatePhases(newFirePattern))
  }

  const updateIncome = (incomeIndex: number, updatedValue: any): void => {

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
                  {incomeAndDeductionSet.incomes.map((income: Income, incomeIndex: number) => (
                    <>
                      <TaxIncomeTableRowSet rowLabel={income.name}
                                            value={income.amount || ''}
                                            onChange={v => updateIncome(incomeIndex, v)}
                      />
                      {income.deductions && income.deductions.map((deduction, i) => (
                        <TaxIncomeTableRowSet rowLabel={deduction.name}
                                              value={deduction.amount || ''}
                                              onChange={v => update(incomeIndex, i, v)}
                                              onChangeCheck={v => updateChecked(incomeIndex, i, v)}
                                              disabled={!deduction.editable}
                        />
                      ))}
                      {income.calculatedDeductions && income.calculatedDeductions.map((deduction, i) => (
                        <TaxIncomeTableRowSet rowLabel={deduction.name}
                                              value={deduction.calcAmount(income.amount) || ''}
                                              disabled={true}
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
                  {/*             onChange={(newValue, i) => update(i, 'income', newValue)} />*/}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

