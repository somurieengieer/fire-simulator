import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";
import {TaxTable} from "./TaxTable";
import {TaxSet} from "../../features/tax/taxSlice";
import {TaxPieChart} from "../atoms/TaxPieChart";

const useStyles = makeStyles({
  paper: {
    width: 500,
  },
});

interface FirePatternPaperProps {
  taxSet: TaxSet,
}

export function TaxPaper({taxSet}: FirePatternPaperProps) {

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <TaxTable taxSet={taxSet} />
      <TaxPieChart taxSet={taxSet} />
    </Paper>
  );
}

