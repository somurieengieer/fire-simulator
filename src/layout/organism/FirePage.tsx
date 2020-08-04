import React, {useState} from 'react';
import {Paper} from "@material-ui/core";
import {
  calcCompoundInterestResult,
  CompoundInterestProps,
  CompoundInterestResult
} from "../../features/compoundInterest/compoundInterest";
import {makeStyles} from "@material-ui/core/styles";
import {Phase} from "../molecules/Phase";

const useStyles = makeStyles({
  table: {
    // width: 650,
  },
});

// 複利計算ページ
export function FirePage() {

  const classes = useStyles();

  const [interestProps, setInterestProps] = useState<CompoundInterestProps>(
    {presentAmount: 100, reserveAmount: 10, reserveYears: 10, annualInterest: 3}
  )
  const [compoundInterestResult, setCompoundInterestResult]  = useState<CompoundInterestResult | null>(null)

  const calc = () => {
    console.log('interestProps', interestProps)
    setCompoundInterestResult(calcCompoundInterestResult(interestProps))
    console.log(calcCompoundInterestResult(interestProps))
  }

  return (
    <>
      <Paper>
        <Phase ageAtStart={32} ageAtEnd={60} assetAtStart={600} />
      </Paper>
    </>
  );
}

