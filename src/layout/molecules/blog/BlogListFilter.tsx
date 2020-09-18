import React from 'react'
import { Box } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { BlogListFilterLabel } from '../../atoms/blog/BlogListFilterLabel'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
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

  return (
    <Box className={classes.root}>
      {filterLabels.map(label => (
        <BlogListFilterLabel title={label}
          callback={() => callbackForUpdate(label)}
          active={label === activeLabel}
          key={label}/>
      ))}
    </Box>
  )
}
