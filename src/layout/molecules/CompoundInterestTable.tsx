import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {
  addYearToCompoundInterestResult,
  CompoundInterestResult
} from "../../features/compoundInterest/compoundInterest";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    width: 250,
  },
});

interface CompoundInterestTableByAgeProps {
  result: CompoundInterestResult,
  startAge: number,
}

export function CompoundInterestTableByAge({result, startAge}: CompoundInterestTableByAgeProps) {
  console.log('result at CompoundInterestTableByAge', result)
  const resultCalculatedByAge = addYearToCompoundInterestResult(result, startAge)
  console.log('resultCalculatedByAge at CompoundInterestTableByAge', resultCalculatedByAge)
  return (<CompoundInterestCommonTable
    label='年齢'
    yearPostWord='歳'
    result={resultCalculatedByAge}
  />)
}

interface CompoundInterestTableProps {
  result: CompoundInterestResult,
}

// 複利結果表
export function CompoundInterestTable({result}: CompoundInterestTableProps) {
  return (<CompoundInterestCommonTable
    label='経過年'
    yearPostWord='年目'
    result={result}
  />)
}


interface CompoundInterestCommonTableProps {
  label: string,
  yearPostWord: string,
  result: CompoundInterestResult,
}

// 複利結果表
function CompoundInterestCommonTable({label, yearPostWord, result}: CompoundInterestCommonTableProps) {

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{label}</TableCell>
            <TableCell align="right">資産総額</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {result.rowByYear.map((interestByYear) => (
            <TableRow key={interestByYear.year}>
              <TableCell component="th" scope="row">
                {interestByYear.year}{yearPostWord}
              </TableCell>
              <TableCell align="right">{Number(interestByYear.amount).toFixed(0)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

