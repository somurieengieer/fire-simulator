import React from 'react'
import { Box } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textDecoration: 'none',
      color: 'inherit'
    }
  })
)

interface Props {
  url: string,
  children: React.ReactNode;
}

// 複利計算ページ
export function NonDecoratedLink ({ url, children }: Props) {
  const classes = useStyles()
  return (
    <Link to={url} className={classes.root}>
      {children}
    </Link>
  )
}
