import React from 'react'
import { Box } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => createStyles({
  root: {
    maxWidth: 800,
    marginBottom: theme.spacing(3)
  }
}))

interface Props {
  children: React.ReactNode
}

export function SideBarContentGroup ({ children }: Props) {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      {children}
    </Box>
  )
}
