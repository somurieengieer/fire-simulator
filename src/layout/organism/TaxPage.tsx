import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {TaxPaper} from "../molecules/TaxPaper";
import {useDispatch, useSelector} from "react-redux";
import {selectTaxSet, TaxSet, updateTaxSet} from "../../features/tax/taxSlice";
import {JustifyCenterBox} from "../atoms/JustifyCenterBox";
import {personalUpdate} from "../../features/tax/taxInitialData";
import {useLocation} from "react-router";

const useStyles = makeStyles({
  table: {
    // width: 650,
  },
});



// 個人事業主・サラリーマンの所得計算ページ（使わなそうなので中断）
export function TaxPage() {

  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const selectedTaxSet: TaxSet[] = useSelector(selectTaxSet)

  const isPDataMode = (): boolean => {
    const getParams = new URLSearchParams(location.search);
    return Boolean(getParams.get(`pData`))
  }

  useEffect(() => {
    if (isPDataMode()) {
      personalUpdate(selectedTaxSet).forEach(set =>
        dispatch(updateTaxSet(set)))
    }
  }, [location])


  return (
    <>
      <JustifyCenterBox>
        {selectedTaxSet && selectedTaxSet.map((taxSet: TaxSet) => (
          <TaxPaper taxSet={taxSet} />
        ))}
      </JustifyCenterBox>
    </>
  );
}

