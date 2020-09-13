import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {PhasesTable} from './PhaseTable'
import {FirePattern} from '../../features/fire/fireSlice'
import {Box, Paper} from '@material-ui/core'

const useStyles = makeStyles({
  paper: {
    width: '100%',
    marginBottom: 20
  }
})

interface FirePatternPaperProps {
  firePattern: FirePattern,
}

// 複利計算ページ
export function FirePatternPaper({firePattern}: FirePatternPaperProps) {
  const classes = useStyles()

  return (
    <Box m={1}>
      <Paper className={classes.paper}>
        <PhasesTable firePattern={firePattern}/>
      </Paper>
    </Box>
  )
}
