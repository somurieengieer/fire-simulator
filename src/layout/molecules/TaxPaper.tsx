import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, Paper} from "@material-ui/core";
import {TaxTable} from "./TaxTable";
import {TaxSet} from "../../features/tax/taxSlice";

const useStyles = makeStyles({
  table: {
    // width: 650,
  },
});

interface FirePatternPaperProps {
  taxSet: TaxSet,
  index: number,
}

export function TaxPaper({taxSet, index}: FirePatternPaperProps) {

  const classes = useStyles();

  return (
    <Box m={1}>
      <Paper style={{width: '100%'}}>
        <TaxTable taxSet={taxSet} taxSetIndex={index}/>
      </Paper>
    </Box>
  );
}

