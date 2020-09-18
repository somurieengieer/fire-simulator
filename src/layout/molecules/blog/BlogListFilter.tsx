import React from 'react'
import { Box } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { BlogListFilterLabel } from '../../atoms/blog/BlogListFilterLabel'
import { JustifyCenterBox } from '../../atoms/JustifyCenterBox'
import classNames from 'classnames'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2)
    },
    table: {
      display: 'table',
      width: '100%'
    },
    cell: {
      display: 'table-cell'
    },
    active: {
      color: theme.palette.secondary.main
    }
  })
)

interface Props {
  filterLabels: string[]
  activeLabel: string
  callbackForUpdate: (label: string) => void
}

export function BlogListFilter ({ filterLabels, activeLabel, callbackForUpdate }: Props) {
  const classes = useStyles()

  const isActive = (label: string): boolean => label === activeLabel

  return (
    <Box className={classNames(classes.root, classes.table)} >
      {filterLabels.map(label => (
        <Box className={classes.cell} key={label}>
          <JustifyCenterBox>
            <BlogListFilterLabel title={label}
              callback={() => callbackForUpdate(label)}
              active={isActive(label)} />
          </JustifyCenterBox>
          {isActive(label) && (
            <JustifyCenterBox>
              <ExpandLessIcon className={classes.active} />
            </JustifyCenterBox>
          )}
        </Box>
      ))}
    </Box>
  )
}
