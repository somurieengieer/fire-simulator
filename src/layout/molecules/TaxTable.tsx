import React from 'react';
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {usePatternTableStyles} from "./PhaseTableItems";
import {theme} from "../materialui/theme";
import {Income, IncomeAndDeductionSet} from "../../features/tax/tax";

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

  const update = (index: number, key: string, updatedValue: any): void => {

    // const newData = Object.assign({}, phases[index])
    // @ts-ignore
    // newData[key] = updatedValue
    // const newFirePattern = JSON.parse(JSON.stringify(firePattern))
    // newFirePattern.phases[index] = newData
    // dispatch(updatePhases(newFirePattern))
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
                <TableHead>
                  <TableRow className={tableClasses.tableHeadRow}>
                    <TableCell colSpan={2}>
                      表タイトル
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell className={tableClasses.tableCellLabel} component="th" scope="row">
                      年齢
                    </TableCell>
                  </TableRow>
                  {incomeAndDeductionSet.incomes.map((income: Income) => (
                    <TableRow>
                      <TableCell className={tableClasses.tableCellLabel} component="th" scope="row">
                        {income.name}
                      </TableCell>
                    </TableRow>
                    )
                  )}
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

