import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {FirePattern, selectFirePatterns} from "../../features/fire/fireSlice";
import {Grid} from "@material-ui/core";
import {CompoundInterestChart} from "../atoms/CompoundInterestChart";
import {FirePatternPaper} from "../molecules/FirePatternPaper";

const useStyles = makeStyles({
  table: {
    // width: 650,
  },
});



// 複利計算ページ
export function FirePage() {

  const classes = useStyles();

  const selectedFirePatterns = useSelector(selectFirePatterns)

  return (
    <>
      <Grid>
        {selectedFirePatterns.map((pattern: FirePattern, i: number) => (
          <FirePatternPaper firePattern={pattern} />
        ))}
      </Grid>
      <Grid>
        <CompoundInterestChart />
      </Grid>
    </>
  );
}

