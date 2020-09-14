import React from 'react'
import { Box, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { addPhase, deletePhase, FirePattern, updatePhases } from '../../features/fire/fireSlice'
import {
  EmptyTableCell,
  SubHeaderRowSet,
  TablePatternHeaderSet,
  TableRowSet,
  usePatternTableStyles
} from './PhaseTableItems'
import { theme } from '../materialui/theme'
import { PhaseClass } from '../../features/fire/Phase'
import { CompoundInterestByPattern } from './CompoundInterestByPattern'
import classNames from 'classnames'
import { empty } from '../../features/utils/Utils'
import { JustifyCenterBox } from '../atoms/JustifyCenterBox'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { BlogContentItem } from '../../blogContent/BlogContentItem'
import { SameTagContents } from '../atoms/blog/BlogTag'

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

interface BlogSideBarProps {
  content: BlogContentItem,
}

// フェーズ表示
export function BlogSideBar ({ content }: BlogSideBarProps) {
  const classes = useStyles()

  return (
    <Grid className={classes.root}>
      <SameTagContents tag={content.tags[0]} />
    </Grid>
  )
}
