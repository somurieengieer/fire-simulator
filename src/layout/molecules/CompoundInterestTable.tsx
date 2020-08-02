import React, {useState} from 'react';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@material-ui/core";
import {
  calcCompoundInterestResult,
  CompoundInterestProps,
  CompoundInterestResult
} from "../../features/compoundInterest/compoundInterest";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    width: 250,
  },
});


// 複利結果表
export function CompoundInterestTable({result}: CompoundInterestResult) {

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>経過年</TableCell>
            <TableCell align="right">資産総額</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {result.map((interestByYear) => (
            <TableRow key={interestByYear.year}>
              <TableCell component="th" scope="row">
                {interestByYear.year}年目
              </TableCell>
              <TableCell align="right">{interestByYear.amount.toFixed(0)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

