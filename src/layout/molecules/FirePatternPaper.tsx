import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {PhasesTable} from "./PhaseTable";
import {FirePattern} from "../../features/fire/fireSlice";
import {Box, Paper, Typography} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    // width: 650,
  },
});

interface FirePatternPaperProps {
  firePattern: FirePattern,
}

// 複利計算ページ
export function FirePatternPaper({firePattern}: FirePatternPaperProps) {

  const classes = useStyles();
  const hasError = firePattern.hasError

  return (
    <Box m={1}>
      <Paper style={{width: '100%'}}>
            {hasError && (<Typography>エラーあり！</Typography>)}
            <PhasesTable firePattern={firePattern} />
      </Paper>
    </Box>
  );
}

