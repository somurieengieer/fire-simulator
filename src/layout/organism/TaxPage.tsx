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
import {Section, SectionContent, SectionList, SectionTitle} from "../atoms/blog/Section";
import {GoogleAdsSmall} from "../../ads/GoogleAdsSmall";
import {Grid} from "@material-ui/core";

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
        createParam(`p${taxSet.setNumber}retirementAllowance`, taxSet.retirementTax.disposableIncome),
        createParam(`p${taxSet.setNumber}income`, taxSet.disposableIncome),
        createParam(`p${taxSet.setNumber}annuity`, taxSet.retirementAnnuity.amount),
      ]
        .filter((val: string) => val !== '')
        .join('&')
    })
      .filter((val: string) => val !== '')
      .join('&')
    return `${myUrl.top}?${params}`
  }

  return (
    <>
      <GoogleAdsSmall />
      <JustifyCenterBox width={'800'}>
        <Section maxWidth={800}>
          <SectionTitle>使い方</SectionTitle>
          <SectionContent>
            ※PC推奨<br />
            FIREシミュレーターの補助サービスです。値入力後に「FIREシミュレーターを開く」ボタンを押してください。<br/>
            注意点は以下の通りです
            <SectionList items={[
              '表記は全て万円表記です(ふるさと納税のみ小数点以下1桁を表示)',
              'おおまかな計算目的なので細かい計算は端折っています。厳密な計算用途で使用しないでください',
              'ターゲットは普通のサラリーマン、個人事業主です。よく使いそうな項目のみに絞っています',
              '令和2年度対応済',
            ]} />
          </SectionContent>
        </Section>
      </JustifyCenterBox>
      <Link to={() => showFireSimulator()}
            target="_blank"
        >
        FIREシミュレーターを開く
      </Link>
      <Grid container>
        {selectedTaxSet && selectedTaxSet.map((taxSet: TaxSet) => (
          <Grid item xs={12} md={4}>
            <TaxPaper taxSet={taxSet} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

