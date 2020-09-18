import React from 'react'
import { Box } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import classNames from 'classnames'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 200,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      textAlign: 'center',
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
      {title}
    </Box>
  )
}
