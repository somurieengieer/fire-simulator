import React from 'react';
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {addPhase, deletePhase, FirePattern, updatePhases} from "../../features/fire/fireSlice";
import {SubHeaderRowSet, TablePatternHeaderSet, TableRowSet, usePatternTableStyles} from "./PhaseTableItems";
import {theme} from "../materialui/theme";
import AddIcon from '@material-ui/icons/Add';
import {PhaseClass} from "../../features/fire/Phase";
import {CompoundInterestByPattern} from "./CompoundInterestByPattern";
import classNames from 'classnames'
import {empty} from "../../features/utils/Utils";

const useStyles = makeStyles({
});

interface PhasesTableProps {
  firePattern: FirePattern,
}

// フェーズ表示
export function PhasesTable({firePattern}: PhasesTableProps) {

  const phases = firePattern.phases.map(phaseData => new PhaseClass(phaseData))

  const classes = useStyles();
  const tableClasses = usePatternTableStyles();
  const dispatch = useDispatch();

  const update = (index: number, key: string, updatedValue: any): void => {

    const newData = Object.assign({}, phases[index])
    // @ts-ignore
    newData[key] = updatedValue
    const newFirePattern = JSON.parse(JSON.stringify(firePattern))
    newFirePattern.phases[index] = newData
    dispatch(updatePhases(newFirePattern))
  }

  const execDeletePhase = (phaseIndex: number) => {
    dispatch(deletePhase({patternNumber: firePattern.patternNumber, phaseIndex: phaseIndex}))
  }

  const titleColSpan = () => phases.length + 1

  return (
    <>
      <div style={{width: '100%'}}>
        <Grid  style={{marginLeft: 40}}>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <TableContainer component={Paper} >
                <Table className={tableClasses.table} aria-label="simple table"
                       size={'small'}
                >
                  <TablePatternHeaderSet firePattern={firePattern} colSpan={titleColSpan() + 1} />
                  <TableBody>
                    <TableRow>
                      <TableCell className={tableClasses.tableCellLabel} component="th" scope="row">
                        年齢
                      </TableCell>
                      {phases.map((phase: PhaseClass, i: number) => (
                        <TableCell className={tableClasses.tableCell} align="center">
                          <input value={phase.ageAtStart}
                                 onChange={v => update(i, 'ageAtStart', v.target.value)}
                                 disabled={!phase.ageAtStartEditable}
                                 size={3}
                                 className={classNames({[tableClasses.inputError]: i === 0 && empty(phase.ageAtStart)}) }
                          />
                          〜
                          <input value={phase.ageAtEnd}
                                 onChange={v => update(i, 'ageAtEnd', v.target.value)}
                                 size={3}
                                 className={classNames({[tableClasses.inputError]: phase.ageAtStart > phase.ageAtEnd}) }
                          />
                          歳
                          <button onClick={() => execDeletePhase(i)}>✗</button>
                        </TableCell>
                      ))}
                      <TableCell rowSpan={10} width={40} style={{backgroundColor: theme.palette.primary.main}}
                                 className={tableClasses.linkCell}
                                 onClick={() => dispatch(addPhase({patternNumber: firePattern.patternNumber}))}
                      >
                        <AddIcon />
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
                                 disabledCallback={(phase: PhaseClass) => !phase.assetAtStartEditable} />
                    <TableRowSet rowLabel={'リターン'}
                                 phaseClasses={phases}
                                 valueCallback={p => p.annualInterest}
                                 onChange={(newValue, i) => update(i, 'annualInterest', newValue)}
                                 validate={p => empty(p.annualInterest)}
                                 disabledCallback={(phase: PhaseClass) => false} />
                    <TableRowSet rowLabel={'終了時資産'}
                                 phaseClasses={phases}
                                 valueCallback={p => p.assetAtEnd()?.toFixed(0)}
                                 onChange={(newValue, i) => update(i, 'assetAtEnd()', newValue)}
                                 disabledCallback={(phase: PhaseClass) => true} />
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={5}>
              <CompoundInterestByPattern firePattern={firePattern} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

