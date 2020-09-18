import React from 'react'
import { Box } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import classNames from 'classnames'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 200,
      margin: theme.spacing(2),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      textAlign: 'center',
      backgroundColor: theme.palette.primary.main,
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
    title: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2)
    },
    footer: {
      alignItems: 'center'
    },
    footerRight: {
      paddingRight: '2rem',
      textAlign: 'end'
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
