import React, {useEffect, useState} from 'react';
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {calcCompoundInterestResult} from "../../features/compoundInterest/compoundInterest";
import {makeStyles} from "@material-ui/core/styles";

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

// 運用しない場合の終了時資産
function calcAssetAtEndWithoutOperation(data: PhaseData): number {
  return data.assetAtStart + (data.income - data.expense) * data.operationPeriod
}

export interface PhaseProps {
  ageAtStart: number, // フェーズ開始時年齢
  ageAtEnd: number,   // フェーズ終了時年齢
  assetAtStart: number, // 開始時資産
  ageAtStartEditable: boolean,
  assetAtStartEditable: boolean,
}

// 複利計算ページ
export function Phase({ageAtStart, ageAtEnd, assetAtStart, ageAtStartEditable, assetAtStartEditable}: PhaseProps) {

  const classes = useStyles();
  const operationPeriod = ageAtEnd - ageAtStart + 1

  const [data, setData] = useState<PhaseData>(
    { income: 500,
      expense: 400,
      assetAtStart: assetAtStart,
      annualInterest: 3,
      assetAtEnd: 0,
      operationPeriod: operationPeriod,
    }
  )

  const update = (key: string, updatedValue: any): void => {

    const newData = Object.assign({}, data)
    // @ts-ignore
    newData[key] = updatedValue
    setData(newData)
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
    if (data.assetAtEnd !== calcAssetAtEnd()) {
      calc()
    }
  }, [data])

  const operationItems = [
    {label: '開始時資産', key: 'assetAtStart', disabled: true },
    {label: 'リターン', key: 'annualInterest', disabled: false },
    {label: '終了時資産', key: 'assetAtEnd', disabled: true },
    ]

  return (
    <>
      <Paper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {ageAtStart}歳〜{ageAtEnd}歳
        </Grid>
      </Grid>
      <Grid  style={{marginLeft: 40}}>
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
                  <TableCell align="right">
                    <input value={data.expense}
                           onChange={v => update('expense', v.target.value)}
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
                  <TableCell colSpan={2}>資産運用</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {operationItems.map((item) => (
                <TableRow key={item.label}>
                  <TableCell component="th" scope="row">
                    {item.label}
                  </TableCell>
                  <TableCell align="right">
                    <input value={
                      // @ts-ignore
                      data[item.key]
                    }
                           disabled={item.disabled}
                           onChange={v => update(item.key, v.target.value)}
                    />
                  </TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      </Grid>
      </Paper>
    </>
  );
}

