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
    },
    '& > blockquote': {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      border: 'solid 2px',
      borderColor: theme.palette.grey.A700,
      backgroundColor: theme.palette.grey.A100
    },
    '& > * > li': {
      textDecoration: 'none'
    }
  }
}))

interface Props {
url: string
}

function createTOC (markdownSource: string): string {
  var markdownIt = require('markdown-it')
  var markdownItTocAndAnchor = require('markdown-it-toc-and-anchor').default

  return markdownIt({
    html: true,
    linkify: true,
    typographer: true
  })
    .use(markdownItTocAndAnchor, {
    })
    .render(markdownSource)
}

function htmlToReactJsx (htmlSource: string): string {
  var HtmlToReactParser = require('html-to-react').Parser

  var htmlToReactParser = new HtmlToReactParser()
  var reactElement = htmlToReactParser.parse(htmlSource)
  return reactElement
}

export default function BlogContentMarkdown ({ url }: Props) {
  const classes = useStyles()
  const [source, setSource] = useState<string>('Loading...')

  const getSource = async (url: string): Promise<string> => {
    const res = await fetch(url)
    return await res.text()
  }

  // const applyTOC = (markdownSource: string): string => {
  //   return createTOC(markdownSource) + markdownSource
  // }

  useEffect(() => {
    getSource(url)
      .then(r => setSource(r))
  }, [url])

  return (
    <Box className={classes.content}>
      {htmlToReactJsx(createTOC(source))}
      <div>■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■</div>
      <ReactMarkdown source={createTOC(source)} />
      <div>■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■</div>
      <ReactMarkdown source={source} />
    </Box>
  )
}
