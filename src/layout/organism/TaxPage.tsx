import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import {TaxPaper} from "../molecules/TaxPaper";
import {TaxSet} from "../../features/tax/tax";
import {useSelector} from "react-redux";
import {selectTaxSet} from "../../features/tax/taxSlice";

const useStyles = makeStyles({
  table: {
    // width: 650,
  },
});



// 個人事業主・サラリーマンの所得計算ページ（使わなそうなので中断）
export function TaxPage() {

  const classes = useStyles();

  const selectedTaxSet = useSelector(selectTaxSet)

  return (
    <>
      <Grid>
        {selectedTaxSet && selectedTaxSet.map((taxSet: TaxSet, index: number) => (
          <TaxPaper taxSet={taxSet} index={index} />
        ))}
      </Grid>
    </>
  );
}

