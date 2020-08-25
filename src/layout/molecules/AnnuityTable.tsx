import React from 'react';
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {usePatternTableStyles} from "./PhaseTableItems";
import {theme} from "../materialui/theme";
import {TaxSubHeaderRowSet, TaxTableRowSet} from "./TaxTableItems";
import {useDispatch} from "react-redux";
import {AnnuityForEmployee, AnnuitySet, updateAnnuity} from "../../features/annuity/annuitySlice";

const useStyles = makeStyles({
  root: {
    margin: 5,
    padding: theme.spacing(0.5),
  }
});

interface AnnuityTableProps {
  annuity: AnnuitySet,
}

export function AnnuityTable({annuity}: AnnuityTableProps) {

  const classes = useStyles();
  const tableClasses = usePatternTableStyles();
  const dispatch = useDispatch();

  const updateTaxSetValue = (updateValue: () => void) => {
    updateValue()
    dispatch(updateAnnuity(annuity))
  }

  console.log('annuity', annuity)

  return (
    <>
      <Grid  className={classes.root}>
          <TableContainer component={Paper}>
            <Table className={tableClasses.table} aria-label="simple table"
                   size={'small'}
            >
              <TableHead>
                <TableRow className={tableClasses.tableHeadRow}>
                  <TableCell colSpan={2}>
                    年金計算
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TaxSubHeaderRowSet title={'老齢基礎年金'}>
                  <TaxTableRowSet rowLabel={'納付年数'}
                                  value={annuity.base.paymentYear}
                                  onChange={v => updateTaxSetValue(() => annuity.base.paymentYear = Number(v))}
                  />
                </TaxSubHeaderRowSet>
                <TaxSubHeaderRowSet title={'老齢厚生年金'}>
                  {annuity.employees.map((employee: AnnuityForEmployee, index: number) => (
                    <>
                      <TaxTableRowSet rowLabel={`納付年数${index}`}
                                      value={employee.paymentYear}
                                      onChange={v => updateTaxSetValue(() => employee.paymentYear = Number(v))}
                      />
                      <TaxTableRowSet rowLabel={`平均標準報酬額${index}`}
                                      value={employee.averageSalary}
                                      onChange={v => updateTaxSetValue(() => employee.averageSalary = Number(v))}
                      />
                    </>
                    ))}
                </TaxSubHeaderRowSet>
                <TaxSubHeaderRowSet title={'受取年金'}
                                    amount={annuity.base.annuity + annuity.employeesAnnuity}>
                  <TaxTableRowSet rowLabel={'老齢基礎年金'}
                                  value={annuity.base.annuity}
                                  disabled={true}
                  />
                  <TaxTableRowSet rowLabel={'老齢厚生年金'}
                                  value={annuity.employeesAnnuity}
                                  disabled={true}
                  />
                </TaxSubHeaderRowSet>
              </TableBody>
            </Table>
          </TableContainer>
      </Grid>
    </>
  );
}

