import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {TaxPaper} from "../molecules/TaxPaper";
import {useSelector} from "react-redux";
import {selectTaxSet, TaxSet} from "../../features/tax/taxSlice";
import {JustifyCenterBox} from "../atoms/JustifyCenterBox";

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
      <JustifyCenterBox>
        {selectedTaxSet && selectedTaxSet.map((taxSet: TaxSet, index: number) => (
          <TaxPaper taxSet={taxSet} index={index} />
        ))}
      </JustifyCenterBox>
    </>
  );
}

