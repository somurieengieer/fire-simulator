import React from 'react';
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {addPhase, deletePhase, FirePattern, updatePhases} from "../../features/fire/fireSlice";
import {SubHeaderRowSet, TablePatternHeaderSet, TableRowSet} from "./PhaseTableItems";
import {theme} from "../materialui/theme";
import AddIcon from '@material-ui/icons/Add';
import {PhaseClass} from "../../features/fire/Phase";
import {CompoundInterestByPattern} from "./CompoundInterestByPattern";

const useStyles = makeStyles({
  table: {
    // width: 650,
  },
  tableCellLabel: {
    minWidth: 200,
    backgroundColor: theme.palette.secondary.light,
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
    const newFirePattern = JSON.parse(JSON.stringify(firePattern))
    newFirePattern.phases[index] = newData
    dispatch(updatePhases(newFirePattern))
  }

  const execDeletePhase = (phaseIndex: number) => {
    if (!phaseIndex) return
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
                          { !!i && (
                            <button onClick={() => execDeletePhase(i)}>✗</button>
                          )}
                        </TableCell>
                      ))}
                      <TableCell rowSpan={10} width={40} style={{backgroundColor: theme.palette.primary.main}}
                                 className={classes.linkCell}
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
            <Grid item xs={5}>
              <CompoundInterestByPattern firePattern={firePattern} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

