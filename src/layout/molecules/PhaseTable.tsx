import React from 'react'
import {Box, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {useDispatch} from 'react-redux'
import {addPhase, deletePhase, FirePattern, updatePhases} from '../../features/fire/fireSlice'
import {
  EmptyTableCell,
  SubHeaderRowSet,
  TablePatternHeaderSet,
  TableRowSet,
  usePatternTableStyles
} from './PhaseTableItems'
import {theme} from '../materialui/theme'
import {PhaseClass} from '../../features/fire/Phase'
import {CompoundInterestByPattern} from './CompoundInterestByPattern'
import classNames from 'classnames'
import {empty} from '../../features/utils/Utils'
import {JustifyCenterBox} from '../atoms/JustifyCenterBox'
import AddCircleIcon from '@material-ui/icons/AddCircle'

const useStyles = makeStyles({
  root: {
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 5,
    padding: theme.spacing(0.5),
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0
    }
  }
})

interface PhasesTableProps {
  firePattern: FirePattern,
}

// フェーズ表示
export function PhasesTable ({ firePattern }: PhasesTableProps) {
  const phases = firePattern.phases.map(phaseData => new PhaseClass(phaseData))

  const classes = useStyles()
  const tableClasses = usePatternTableStyles()
  const dispatch = useDispatch()

  const update = (index: number, key: string, updatedValue: any): void => {
    const newData = Object.assign({}, phases[index])
    // @ts-ignore
    newData[key] = updatedValue
    const newFirePattern = JSON.parse(JSON.stringify(firePattern))
    newFirePattern.phases[index] = newData
    dispatch(updatePhases(newFirePattern))
  }

  const execDeletePhase = (phaseIndex: number) => {
    dispatch(deletePhase({ patternNumber: firePattern.patternNumber, phaseIndex: phaseIndex }))
  }

  const insertPhase = (index: number) => {
    dispatch(addPhase({ patternNumber: firePattern.patternNumber, phaseIndex: index }))
  }

  const insertPhaseButtonActive = (index: number) => {
    const phases = firePattern.phases
    return ((phases[index] && phases[index].ageAtStart !== phases[index].ageAtEnd) ||
      (index !== 0 && phases[index - 1].ageAtStart !== phases[index - 1].ageAtEnd))
  }

  const titleColSpan = () => phases.length + 2

  return (
    <>
      <Grid className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={7}>
            <TableContainer component={Paper}>
              <Table className={tableClasses.table} aria-label="simple table"
                size={'small'}
              >
                <TablePatternHeaderSet firePattern={firePattern} colSpan={titleColSpan()}/>
                <TableBody>
                  <TableRow>
                    <TableCell className={tableClasses.tableCellLabel} component="th" scope="row">
                      年齢
                    </TableCell>
                    {phases.map((phase: PhaseClass, i: number) => (
                      <TableCell className={tableClasses.tableCell} align="center" key={i}>
                        <input value={phase.ageAtStart}
                          onChange={v => update(i, 'ageAtStart', v.target.value)}
                          disabled={!phase.ageAtStartEditable}
                          size={3}
                          className={classNames({ [tableClasses.inputError]: i === 0 && empty(phase.ageAtStart) })}
                        />
                        〜
                        <input value={phase.ageAtEnd}
                          onChange={v => update(i, 'ageAtEnd', v.target.value)}
                          size={3}
                          className={classNames({ [tableClasses.inputError]: phase.ageAtStart > phase.ageAtEnd })}
                        />
                        歳
                        <button disabled={phases.length === 1}
                          onClick={() => execDeletePhase(i)}>✗</button>
                        <Box style={{
                          position: 'absolute',
                          zIndex: 10,
                          top: 10,
                          left: -26
                        }}>
                          <IconButton onClick={() => insertPhase(i)}
                            className={tableClasses.linkCell}
                            disabled={!insertPhaseButtonActive(i)}
                            aria-label="add">
                            <AddCircleIcon/>
                          </IconButton>
                        </Box>
                        {(i === firePattern.phases.length - 1) && (
                          <Box style={{
                            position: 'absolute',
                            zIndex: 10,
                            top: 10,
                            right: -22
                          }}>
                            <IconButton onClick={() => dispatch(addPhase({ patternNumber: firePattern.patternNumber }))}
                              className={tableClasses.linkCell}
                              aria-label="add">
                              <AddCircleIcon/>
                            </IconButton>
                          </Box>
                        )}
                      </TableCell>
                    ))}
                    <EmptyTableCell/>
                  </TableRow>
                  <TableRowSet rowLabel={'メモ'}
                    phaseClasses={phases}
                    valueCallback={p => p.note}
                    isTypeString={true}
                    onChange={(newValue, i) => update(i, 'note', newValue)}/>
                  <SubHeaderRowSet title={'収入'} colSpan={titleColSpan()}/>
                  <TableRowSet rowLabel={'手取り'}
                    phaseClasses={phases}
                    valueCallback={p => p.income}
                    onChange={(newValue, i) => update(i, 'income', newValue)}/>
                  <SubHeaderRowSet title={'支出'} colSpan={titleColSpan()}/>
                  <TableRowSet rowLabel={'支出総額'}
                    phaseClasses={phases}
                    valueCallback={p => p.expense}
                    onChange={(newValue, i) => update(i, 'expense', newValue)}/>
                  <SubHeaderRowSet title={'資産運用'} colSpan={titleColSpan()}/>
                  <TableRowSet rowLabel={'開始時資産'}
                    phaseClasses={phases}
                    valueCallback={p => p.assetAtStart}
                    onChange={(newValue, i) => update(i, 'assetAtStart', newValue)}
                    disabledCallback={(phase: PhaseClass) => !phase.assetAtStartEditable}/>
                  <TableRowSet rowLabel={'年間資産繰入額'}
                    phaseClasses={phases}
                    valueCallback={p => p.investmentByYear()}
                    onChange={(newValue, i) => update(i, 'investmentByYear()', newValue)}
                    disabledCallback={(phase: PhaseClass) => true}/>
                  <TableRowSet rowLabel={'利回り(%)'}
                    phaseClasses={phases}
                    valueCallback={p => p.annualInterest}
                    onChange={(newValue, i) => update(i, 'annualInterest', newValue)}
                    validate={p => empty(p.annualInterest)}
                    disabledCallback={(phase: PhaseClass) => false}/>
                  <TableRowSet rowLabel={'終了時資産'}
                    phaseClasses={phases}
                    valueCallback={p => p.assetAtEnd()?.toFixed(0)}
                    onChange={(newValue, i) => update(i, 'assetAtEnd()', newValue)}
                    disabledCallback={(phase: PhaseClass) => true}/>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} lg={5}>
            <JustifyCenterBox>
              <CompoundInterestByPattern firePattern={firePattern}/>
            </JustifyCenterBox>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
