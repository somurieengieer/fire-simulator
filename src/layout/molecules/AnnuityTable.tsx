import React from 'react';
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {usePatternTableStyles} from "./PhaseTableItems";
import {theme} from "../materialui/theme";
import {TaxSubHeaderRowSet, TaxTableRowSet} from "./TaxTableItems";
import {useDispatch} from "react-redux";
import {AnnuityForEmployee, AnnuitySet, updateAnnuity} from "../../features/annuity/annuitySlice";
import {numberFromHalfWidthToFullWidth} from "../../features/utils/Utils";

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
                    年金計算 パターン{numberFromHalfWidthToFullWidth(annuity.setNumber)}
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
                      <TaxTableRowSet rowLabel={`納付年数${index+1}`}
                                      value={employee.paymentYear}
                                      onChange={v => updateTaxSetValue(() => employee.paymentYear = Number(v))}
                      />
                      <TaxTableRowSet rowLabel={`平均標準報酬額${index+1}`}
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
                <TaxSubHeaderRowSet title={'累計'}>
                  <TaxTableRowSet rowLabel={'納付金額合計'}
                                  value={annuity.totalPaidAnnuity}
                                  disabled={true}
                  />
                  <TaxTableRowSet rowLabel={'受取年金合計(65〜84歳受取)'}
                                  value={annuity.totalEstimatedAnnuity}
                                  disabled={true}
                  />
                  <TaxTableRowSet rowLabel={'リターン率'}
                                  value={(annuity.totalEstimatedAnnuity / annuity.totalPaidAnnuity).toFixed(2)}
                                  disabled={true}
                                  noFixed={true}
                  />
                  <TaxTableRowSet rowLabel={'納付金額合計(法人支払い分を含む)'}
                                  value={(annuity.totalPaidAnnuityIncludingCompany)}
                                  disabled={true}
                  />
                  <TaxTableRowSet rowLabel={'リターン率(法人支払い分を含む)'}
                                  value={(annuity.totalEstimatedAnnuity / annuity.totalPaidAnnuityIncludingCompany).toFixed(2)}
                                  disabled={true}
                                  noFixed={true}
                  />
                </TaxSubHeaderRowSet>
              </TableBody>
            </Table>
          </TableContainer>
      </Grid>
    </>
  );
}

