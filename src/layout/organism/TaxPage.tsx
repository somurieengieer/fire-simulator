import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {TaxPaper} from "../molecules/TaxPaper";
import {useDispatch, useSelector} from "react-redux";
import {selectTaxSet, TaxSet, updateTaxSet} from "../../features/tax/taxSlice";
import {JustifyCenterBox} from "../atoms/JustifyCenterBox";
import {personalUpdate} from "../../features/tax/taxInitialData";
import {useLocation} from "react-router";
import {myUrl} from "../Urls";
import {Link} from "react-router-dom";

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

  const pDataNumber = (): number => {
    const getParams = new URLSearchParams(location.search);
    return Number(getParams.get(`pData`) || 0)
  }

  useEffect(() => {
    if (pDataNumber()) {
      personalUpdate(selectedTaxSet, pDataNumber()).forEach(set =>
        dispatch(updateTaxSet(set)))
    }
  }, [location])

  const showFireSimulator = () => {
    const createParam = (key: string, val?: number | string) =>
      val === undefined ? '' : `${key}=${val}`

    const params = selectedTaxSet.map(taxSet => {
      return [
        createParam(`p${taxSet.setNumber}nowAge`, taxSet.personalInfo.age),
        createParam(`p${taxSet.setNumber}workingYears`, taxSet.retirementTax.workingYears),
        createParam(`p${taxSet.setNumber}retirementAllowance`, taxSet.retirementTax.disposableIncome),
        createParam(`p${taxSet.setNumber}income`, taxSet.disposableIncome)
      ]
        .filter((val: string) => val !== '')
        .join('&')
    })
      .filter((val: string) => val !== '')
      .join('&')
    return `${myUrl.fire}?${params}`
  }

  return (
    <>
      <Link to={() => showFireSimulator()}
            target="_blank"
            // onClick={(event) => {event.preventDefault(); window.open(showFireSimulator());}
        >
        FIREシミュレーターを開く
      </Link>
      {/*<button*/}
      {/*  onClick={showFireSimulator}*/}
      {/*>*/}
      {/*  FIREシミュレーターを開く*/}
      {/*</button>*/}
      <JustifyCenterBox>
        {selectedTaxSet && selectedTaxSet.map((taxSet: TaxSet) => (
          <TaxPaper taxSet={taxSet} />
        ))}
      </JustifyCenterBox>
    </>
  );
}

