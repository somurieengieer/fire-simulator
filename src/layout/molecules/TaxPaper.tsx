import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";
import {TaxTable} from "./TaxTable";
import {TaxSet} from "../../features/tax/taxSlice";

const useStyles = makeStyles({
  paper: {
    width: 500,
  },
});

interface FirePatternPaperProps {
  taxSet: TaxSet,
  index: number,
}

export function TaxPaper({taxSet, index}: FirePatternPaperProps) {

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <TaxTable taxSet={taxSet} taxSetIndex={index}/>
    </Paper>
  );
}

