import React from 'react';
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {calcCompoundInterestResult, CompoundInterestResult} from "../../features/compoundInterest/compoundInterest";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    // width: 650,
  },
});

export interface PhaseData {
  ageAtStart?: number, // フェーズ開始時年齢
  ageAtEnd?: number,   // フェーズ終了時年齢
  ageAtStartEditable: boolean,
  assetAtStartEditable: boolean,
  income?: number, // 収入
  expense?: number, // 支出
  assetAtStart?: number, // 開始時資産
  annualInterest?: number, // 年利
  // assetAtEnd(): number, // 終了時資産
}

export class PhaseClass implements PhaseData {
  ageAtStart!: number;
  ageAtEnd!: number;
  ageAtStartEditable!: boolean;
  assetAtStartEditable!: boolean;
  income!: number;
  expense!: number;
  assetAtStart!: number;
  annualInterest!: number;
  constructor(data: PhaseData) {
    Object.assign(this, data)
  }
  operationPeriod(): number { // 運用期間（年数）
    return this.ageAtEnd - this.ageAtStart + 1
  }

  assetAtEndWithoutOperation(): number { // 運用しない場合の終了時資産
    return this.assetAtStart + (this.income - this.expense) * this.operationPeriod()
  }
  profitByYear(): number {
    return this.income - this.expense
  }

  assetAtEnd(): number { // 終了時資産
    return this.compoundInterestResult().rowByYear.slice(-1)[0]?.amount
  }

  compoundInterestResult(): CompoundInterestResult {
    return calcCompoundInterestResult({
      presentAmount: this.assetAtStart,
      reserveAmount: this.profitByYear(),
      reserveYears: this.operationPeriod(),
      annualInterest: this.annualInterest,
    })
  }
}


interface PhaseProps {
  data: PhaseClass,
  setData: (updatedData: PhaseClass) => void
}

// 複利計算ページ
export function Phase({data, setData}: PhaseProps) {

  const classes = useStyles();

  const update = (key: string, updatedValue: any): void => {

    const newData = Object.assign({}, data)
    // @ts-ignore
    newData[key] = updatedValue
    setData(newData)
  }

  const operationItems = [
    {label: '開始時資産', value: data.assetAtStart, key: 'assetAtStart', disabled: !data.assetAtStartEditable },
    {label: 'リターン', value: data.annualInterest, key: 'annualInterest', disabled: false },
    {label: '終了時資産', value: data.assetAtEnd(), key: 'assetAtEnd()', disabled: true },
    ]

  return (
    <>
      <Paper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <input value={data.ageAtStart}
                 onChange={v => update('ageAtStart', v.target.value)}
                 disabled={!data.ageAtStartEditable}
                 size={3}
          />
          歳〜
          <input value={data.ageAtEnd}
                 onChange={v => update('ageAtEnd', v.target.value)}
                 size={3}
          />
          歳
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
                      item.value
                    }
                           type={'number'}
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

