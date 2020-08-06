import React from 'react';
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {calcCompoundInterestResult, CompoundInterestResult} from "../../features/compoundInterest/compoundInterest";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {selectPhases, updatePhases} from "../../features/fire/fireSlice";
import {theme} from "../materialui/theme";

const useStyles = makeStyles({
  table: {
    // width: 650,
  },
  tableCellLabel: {
    minWidth: 200,
    backgroundColor: theme.palette.primary.main,
  },
  tableCell: {
    minWidth: 200,
  },
  tableHeadRow: {
    backgroundColor: theme.palette.secondary.main,
  }
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
    return this.ageAtEnd - this.ageAtStart
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

export class PhasesClass {
  phases: PhaseClass[]
  constructor(phases: PhaseClass[]) {
    this.phases = phases
  }
  compoundInterestResult(): CompoundInterestResult {
    const results = this.phases.map(phase => phase.compoundInterestResult())
      .reduce((accum: CompoundInterestResult, cur: CompoundInterestResult) => {

        const lastYear = accum.rowByYear.slice(-1)[0].year
        const arrangedRows = cur.rowByYear.map(r => Object.assign(r, {year: (r.year + lastYear + 1)}))
        accum.rowByYear.push(...arrangedRows)
        return accum
    })
    return results
  }

}

function TableHeaderSet({title, colSpan, cssClass}: {title: string, colSpan: number, cssClass: any}) {
  return (
    <TableHead>
      <TableRow className={cssClass}>
        <TableCell colSpan={colSpan}>{title}</TableCell>
      </TableRow>
    </TableHead>
  )
}

// フェーズ表示
export function PhasesTable() {

  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedPhases = useSelector(selectPhases).map((phaseData: PhaseData) => new PhaseClass(phaseData))

  const update = (index: number, key: string, updatedValue: any): void => {

    const newData = Object.assign({}, selectedPhases[index])
    // @ts-ignore
    newData[key] = updatedValue
    const newPhases = JSON.parse(JSON.stringify(selectedPhases))
    newPhases[index] = newData
    dispatch(updatePhases(newPhases))
  }

  const titleColSpan = () => selectedPhases.length + 1

  const operationItems = [
    {label: '開始時資産', value: (phase: PhaseClass) => phase.assetAtStart, key: 'assetAtStart', disabled: (phase: PhaseClass) => !phase.assetAtStartEditable },
    {label: 'リターン', value: (phase: PhaseClass) => phase.annualInterest, key: 'annualInterest', disabled: (phase: PhaseClass) => false },
    {label: '終了時資産', value: (phase: PhaseClass) => phase.assetAtEnd()?.toFixed(0), key: 'assetAtEnd()', disabled: (phase: PhaseClass) => true },
    ]

  return (
    <>
      <div style={{width: '100%'}}>
      <Paper style={{width: '100%'}}>
          <Grid  style={{marginLeft: 40}}>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <TableContainer component={Paper} >
                  <Table className={classes.table} aria-label="simple table">
                    <TableHeaderSet title={'年齢'} colSpan={titleColSpan()} cssClass={classes.tableHeadRow} />
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes.tableCellLabel} component="th" scope="row">
                          年齢
                        </TableCell>
                        {selectedPhases.map((phase: PhaseClass, i: number) => (
                          <TableCell className={classes.tableCell} align="right">
                            <input value={phase.ageAtStart}
                                   onChange={v => update(i, 'ageAtStart', v.target.value)}
                                   disabled={!phase.ageAtStartEditable}
                                   size={3}
                            />
                            歳〜
                            <input value={phase.ageAtEnd}
                                   onChange={v => update(i, 'ageAtEnd', v.target.value)}
                                   size={3}
                            />
                            歳
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.tableCellLabel} component="th" scope="row">
                          メモ
                        </TableCell>
                        {selectedPhases.map((phase: PhaseClass, i: number) => (
                          <TableCell className={classes.tableCell} align="right">
                            <input
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                    <TableHeaderSet title={'収入'} colSpan={titleColSpan()} cssClass={classes.tableHeadRow} />
                    <TableBody>
                        <TableRow>
                          <TableCell className={classes.tableCellLabel} component="th" scope="row">
                            手取り
                          </TableCell>
                          {selectedPhases.map((phase: PhaseClass, i: number) => (
                          <TableCell className={classes.tableCell} align="right">
                            <input value={phase.income}
                                   onChange={v => update(i, 'income', v.target.value)}
                            />
                          </TableCell>
                          ))}
                        </TableRow>
                    </TableBody>
                    <TableHeaderSet title={'支出'} colSpan={titleColSpan()} cssClass={classes.tableHeadRow} />
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes.tableCellLabel} component="th" scope="row">
                          支出総額
                        </TableCell>
                        {selectedPhases.map((phase: PhaseClass, i: number) => (
                          <TableCell className={classes.tableCell} align="right">
                          <input value={phase.expense}
                                 onChange={v => update(i, 'expense', v.target.value)}
                          />
                        </TableCell>
                          ))}
                      </TableRow>
                    </TableBody>
                    <TableHeaderSet title={'資産運用'} colSpan={titleColSpan()} cssClass={classes.tableHeadRow} />
                    <TableBody>
                      {operationItems.map((item) => (
                        <TableRow key={item.label}>
                          <TableCell className={classes.tableCellLabel} component="th" scope="row">
                            {item.label}
                          </TableCell>
                          {selectedPhases.map((phase: PhaseClass, i: number) => (
                          <TableCell className={classes.tableCell} align="right">
                            <input value={
                              // @ts-ignore
                              item.value(phase)
                            }
                                   type={'number'}
                                   disabled={item.disabled(phase)}
                                   onChange={v => update(i, item.key, v.target.value)}
                            />
                          </TableCell>
                            ))}
                        </TableRow>
                      ))}
                    </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      </div>
    </>
  );
}

