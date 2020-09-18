import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Box } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => createStyles({
  content: {
    margin: 20,
    fontSize: '1.1rem',
    lineHeight: '2.3rem',
    [theme.breakpoints.down('sm')]: {
      margin: 5
    },
    '& > h1': {
      borderLeft: 'solid 10px',
      borderBottom: 'solid 1px',
      borderLeftColor: theme.palette.secondary.main,
      borderBottomColor: theme.palette.secondary.main,
      paddingLeft: 10,
      paddingBottom: 6
    }
  }
}))

interface Props {
url: string
}

export default function BlogContentMarkdown ({ url }: Props) {
  const classes = useStyles()
  const [source, setSource] = useState<string>('Loading...')

  const getSource = async (url: string): Promise<string> => {
    const res = await fetch(url)
    return await res.text()
  }

  useEffect(() => {
    getSource(url)
      .then(r => setSource(r))
  }, [url])

  return (
    <Box className={classes.content}>
      <ReactMarkdown source={source} />
    </Box>
  )
}
