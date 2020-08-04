import React, {useEffect, useState} from 'react';
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {calcCompoundInterestResult} from "../../features/compoundInterest/compoundInterest";
import {makeStyles} from "@material-ui/core/styles";
import {numberFixed} from "../../features/Utils";

const useStyles = makeStyles({
  table: {
    // width: 650,
  },
});

interface PhaseData {
  income: number, // 収入
  expense: number, // 支出
  assetAtStart: number, // 開始時資産
  annualInterest: number, // 年利
  assetAtEnd: number, // 終了時資産
  operationPeriod: number, // 運用期間（年数）
}

interface PhaseProps {
  operationPeriod: number, // 運用期間（年数）
}

// 複利計算ページ
export function Phase({operationPeriod}: PhaseProps) {

  const classes = useStyles();

  const [data, setData] = useState<PhaseData>(
    { income: 500,
      expense: 400,
      assetAtStart: 600,
      annualInterest: 3,
      assetAtEnd: 0,
      operationPeriod: 13,
    }
  )

  const update = (key: string, updatedValue: any): void => {

    const newData = Object.assign({}, data)
    // @ts-ignore
    newData[key] = updatedValue
    console.log('newData: ',newData)
    console.log('same? : ',Object.is(data, newData))

    setData(newData)

    // data.assetAtEnd=2222
    // setData(data)
  }

  const calcAssetAtEnd = (): number => {
    const profitByYear = data.income - data.expense
    return calcCompoundInterestResult({
      presentAmount: data.assetAtStart,
      reserveAmount: profitByYear,
      reserveYears: data.operationPeriod,
      annualInterest: data.annualInterest,
    }).result.slice(-1)[0].amount
  }

  const calc = () => {
    // assetAtEndの更新
    const assetAtEnd = calcAssetAtEnd()
    update('assetAtEnd', assetAtEnd)
  }

  useEffect(() => {
    console.log(data)
    console.log('calcAssetAtEnd()', calcAssetAtEnd())
    if (data.assetAtEnd !== calcAssetAtEnd()) {
      calc()
    }
  }, [data])

  return (
    <>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2}>収入</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/*{rows.map((row) => (*/}
                    <TableRow key={'test'}>
                      <TableCell component="th" scope="row">
                        手取り
                      </TableCell>
                      <TableCell align="right">
                        <input value={data.income}
                               onChange={v => update('income', v.target.value)}
                        />
                      </TableCell>
                    </TableRow>
                  {/*))}*/}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={9}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2}>支出</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/*{rows.map((row) => (*/}
                  <TableRow key={'test'}>
                    <TableCell component="th" scope="row">
                      支出総額（内訳を入力できるよう追って対応）
                    </TableCell>
                    <TableCell align="right">テキストボックス</TableCell>
                  </TableRow>
                  {/*))}*/}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={9}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2}>資産運用</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/*{rows.map((row) => (*/}
                  <TableRow key={'test'}>
                    <TableCell component="th" scope="row">
                      リターン
                    </TableCell>
                    <TableCell align="right">テキストボックス</TableCell>
                  </TableRow>
                  {/*))}*/}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      <Grid>
        終了時資産
        {numberFixed(data.assetAtEnd)}
      </Grid>
    </>
  );
}

