import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => createStyles({
  root: {
    width: '100%',
    border: 'dotted 4px',
    marginBottom: 10,
    padding: 10,
    backgroundColor: theme.palette.primary.main,
    textAlign: 'center'
  }
}))

interface Props {
  title: string
}

export function SmallHeader ({ title }: Props) {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Typography variant='h6'>
        {title}
      </Typography>
    </Box>
  )
}
