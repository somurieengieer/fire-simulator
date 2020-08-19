import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import {TaxPaper} from "../molecules/TaxPaper";
import {defaultIncomeAndDeductionSet} from "../../features/tax/tax";

const useStyles = makeStyles({
  table: {
    // width: 650,
  },
});



// 個人事業主・サラリーマンの所得計算ページ（使わなそうなので中断）
export function TaxPage() {

  const classes = useStyles();

  // const selectedFirePatterns = useSelector(selectFirePatterns)
  const selectedIncomeAndDeductionSet = defaultIncomeAndDeductionSet()

  return (
    <>
      <Grid>
        {/*{selectedFirePatterns.map((pattern: FirePattern, i: number) => (*/}
        {/*  <TaxPaper firePattern={pattern} />*/}
        {/*))}*/}
        <TaxPaper incomeAndDeductionSet={selectedIncomeAndDeductionSet} />
      </Grid>
    </>
  );
}

