import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, Paper} from "@material-ui/core";
import {TaxTable} from "./TaxTable";
import {IncomeAndDeductionSet} from "../../features/tax/tax";

const useStyles = makeStyles({
  table: {
    // width: 650,
  },
});

interface FirePatternPaperProps {
  incomeAndDeductionSet: IncomeAndDeductionSet,
}

export function TaxPaper({incomeAndDeductionSet}: FirePatternPaperProps) {

  const classes = useStyles();

  return (
    <Box m={1}>
      <Paper style={{width: '100%'}}>
            <TaxTable incomeAndDeductionSet={incomeAndDeductionSet}/>
      </Paper>
    </Box>
  );
}

