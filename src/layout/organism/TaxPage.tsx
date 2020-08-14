import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {FirePattern, selectFirePatterns} from "../../features/fire/fireSlice";
import {Grid} from "@material-ui/core";
import {CompoundInterestChart} from "../atoms/CompoundInterestChart";
import {TaxPaper} from "../molecules/TaxPaper";

const useStyles = makeStyles({
  table: {
    // width: 650,
  },
});



// 個人事業主・サラリーマンの所得計算ページ（使わなそうなので中断）
export function TaxPage() {

  const classes = useStyles();

  const selectedFirePatterns = useSelector(selectFirePatterns)

  return (
    <>
      <Grid>
        {selectedFirePatterns.map((pattern: FirePattern, i: number) => (
          <TaxPaper firePattern={pattern} />
        ))}
      </Grid>
      <Grid>
        <CompoundInterestChart />
      </Grid>
    </>
  );
}

