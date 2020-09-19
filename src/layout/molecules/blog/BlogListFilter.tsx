import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { BlogListFilterLabel } from '../../atoms/blog/BlogListFilterLabel'
import { JustifyCenterBox } from '../../atoms/JustifyCenterBox'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      margin: theme.spacing(2)
    },
    table: {
      display: 'table',
      width: '100%'
    },
    cell: {
      display: 'table-cell',
      width: 'auto'
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
    <Box className={classes.root}>
      <Grid container spacing={2}>
        {filterLabels.map(label => (
          <Grid item xs style={{ width: '100%' }} justify={'center'} key={label}>
            <BlogListFilterLabel title={label}
              callback={() => callbackForUpdate(label)}
              active={isActive(label)} />
            {isActive(label) && (
              <JustifyCenterBox>
                <ExpandLessIcon className={classes.active} />
              </JustifyCenterBox>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
