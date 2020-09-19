import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import classNames from 'classnames'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      backgroundColor: theme.palette.grey.A100,
      '&:hover': {
        cursor: 'pointer',
        transform: 'translateY(-2px)',
        transition: '0.6s',
        opacity: 0.9
      }
    },
    active: {
      backgroundColor: theme.palette.secondary.main
    },
    text: {
      width: '100%',
      textAlign: 'center'
    }
  })
)

interface Props {
  title: string,
  active: boolean,
  callback: () => void
}

export function BlogListFilterLabel ({ title, active, callback }: Props) {
  const classes = useStyles()

  return (
    <Box className={classNames(classes.root, { [classes.active]: active })} onClick={callback}>
      <Typography variant={'body1'} className={classes.text}>
        {title}
      </Typography>
    </Box>
  )
}
