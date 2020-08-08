import React from 'react';
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core";
import {calcCompoundInterestResult, CompoundInterestResult} from "../../features/compoundInterest/compoundInterest";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {addPhase, FirePattern, updatePhases} from "../../features/fire/fireSlice";
import {SubHeaderRowSet, TablePatternHeaderSet, TableRowSet} from "./PhaseTableItems";
import {theme} from "../materialui/theme";
import AddIcon from '@material-ui/icons/Add';

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
  linkCell: {
    '&:hover': {
      cursor: 'pointer',
    },
  }
});

export interface PhaseData {
  ageAtStart?: number, // フェーズ開始時年齢
  ageAtEnd?: number,   // フェーズ終了時年齢
  ageAtStartEditable: boolean,
  assetAtStartEditable: boolean,
  note?: string,
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
  note!: string;
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

        const lastYear = accum.rowByYear.slice(-2)[0].year
        const arrangedRows = cur.rowByYear.map(r => Object.assign(r, {year: (r.year + lastYear + 1)}))
        const newRowByYear = accum.rowByYear.slice(0, -1)
        newRowByYear.push(...arrangedRows)
        return {rowByYear: newRowByYear}
    })
    return results
  }
}


interface PhasesTableProps {
  firePattern: FirePattern,
}

// フェーズ表示
export function PhasesTable({firePattern}: PhasesTableProps) {

  const phases = firePattern.phases.map(phaseData => new PhaseClass(phaseData))

  const classes = useStyles();
  const dispatch = useDispatch();

  const update = (index: number, key: string, updatedValue: any): void => {

    const newData = Object.assign({}, phases[index])
    // @ts-ignore
    newData[key] = updatedValue
    const newPhases = JSON.parse(JSON.stringify(phases))
    newPhases[index] = newData
    dispatch(updatePhases(newPhases))
  }

  const titleColSpan = () => phases.length + 1

  return (
    <>
      <div style={{width: '100%'}}>
          <Grid  style={{marginLeft: 40}}>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <TableContainer component={Paper} >
                  <Table className={classes.table} aria-label="simple table"
                         size={'small'}
                  >
                    <TablePatternHeaderSet firePattern={firePattern} colSpan={titleColSpan() + 1} />
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes.tableCellLabel} component="th" scope="row">
                          年齢
                        </TableCell>
                        {phases.map((phase: PhaseClass, i: number) => (
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
                        <TableCell rowSpan={10} width={40} style={{backgroundColor: theme.palette.primary.main}}
                                   className={classes.linkCell}
                                   onClick={() => dispatch(addPhase(firePattern.patternNumber))}
                        >
                          {/*<Box style={{height: '100%', width: '100%'}}>*/}
                          {/*  テスト*/}
                          {/*</Box>*/}
                          {/*<Button variant="contained" color="primary" onClick={() => dispatch(addPhase(firePattern.patternNumber))}*/}
                          {/*        style={{height: '100%', width: '100%'}}*/}
                          {/*>*/}
                            <AddIcon />
                          {/*</Button>*/}
                        </TableCell>
                      </TableRow>
                      <TableRowSet rowLabel={'メモ'}
                                   phaseClasses={phases}
                                   valueCallback={p => p.note}
                                   isTypeString={true}
                                   onChange={(newValue, i) => update(i, 'note', newValue)} />
                      <SubHeaderRowSet title={'収入'} colSpan={titleColSpan()} />
                      <TableRowSet rowLabel={'手取り'}
                                   phaseClasses={phases}
                                   valueCallback={p => p.income}
                                   onChange={(newValue, i) => update(i, 'income', newValue)} />
                      <SubHeaderRowSet title={'支出'} colSpan={titleColSpan()} />
                      <TableRowSet rowLabel={'支出総額'}
                                   phaseClasses={phases}
                                   valueCallback={p => p.expense}
                                   onChange={(newValue, i) => update(i, 'expense', newValue)} />
                      <SubHeaderRowSet title={'資産運用'} colSpan={titleColSpan()} />
                      <TableRowSet rowLabel={'開始時資産'}
                                   phaseClasses={phases}
                                   valueCallback={p => p.assetAtStart}
                                   onChange={(newValue, i) => update(i, 'assetAtStart', newValue)}
                                   disabled={(phase: PhaseClass) => !phase.assetAtStartEditable} />
                      <TableRowSet rowLabel={'リターン'}
                                   phaseClasses={phases}
                                   valueCallback={p => p.annualInterest}
                                   onChange={(newValue, i) => update(i, 'annualInterest', newValue)}
                                   disabled={(phase: PhaseClass) => false} />
                      <TableRowSet rowLabel={'終了時資産'}
                                   phaseClasses={phases}
                                   valueCallback={p => p.assetAtEnd()?.toFixed(0)}
                                   onChange={(newValue, i) => update(i, 'assetAtEnd()', newValue)}
                                   disabled={(phase: PhaseClass) => true} />
                    </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

