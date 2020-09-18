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

export function NonDecoratedLink ({ url, children }: Props) {
  const classes = useStyles()

  const topScroll = () => {
    if (!document.scrollingElement) return
    if (document.scrollingElement.scrollTop < 10) {
      document.scrollingElement.scrollTop = 0
    } else {
      document.scrollingElement.scrollTop = document.scrollingElement.scrollTop / 1.1
      setTimeout(topScroll, 10)
    }
  }
  return (
    <Link to={url} className={classes.root} onClick={topScroll}>
      {children}
    </Link>
  )
}
