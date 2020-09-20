import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => createStyles({
  content: {
    margin: 20,
    fontSize: '1.1rem',
    lineHeight: '2.3rem',
    [theme.breakpoints.down('sm')]: {
      margin: 5
    },
    // 目次(Table Of Contents）
    '& > .markdownIt-TOC': {
      border: 'solid 2px',
      borderColor: theme.palette.grey.A200,
      borderRadius: 6,
      paddingTop: theme.spacing(4),
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
      paddingBottom: theme.spacing(4),
      backgroundColor: theme.palette.common.white,
      '& a': {
        '&:hover': {
          textDecorationLine: 'underline'
        }
      }
    },
    '& h1': {
      borderLeft: 'solid 10px',
      borderBottom: 'solid 1px',
      borderLeftColor: theme.palette.secondary.main,
      borderBottomColor: theme.palette.secondary.main,
      paddingLeft: 10,
      paddingBottom: 6
    },
    '& blockquote': {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      border: 'solid 2px',
      borderColor: theme.palette.grey.A100,
      backgroundColor: '#EEEEEE'
    },
    '& li': {
      textDecoration: 'none'
    },
    '& table': {
      borderCollapse: 'collapse'
    },
    '& th, td': {
      border: 'solid 1px',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      borderColor: theme.palette.grey.A200
    },
    '& th': {
      backgroundColor: theme.palette.primary.main
    },
    '& td': {
      backgroundColor: theme.palette.common.white
    }
  }
}))

interface Props {
url: string
}

function applyTOC (markdownSource: string): string {
  const markdownIt = require('markdown-it')
  const markdownItTocAndAnchor = require('markdown-it-toc-and-anchor').default

  return markdownIt({
    html: true,
    linkify: true,
    typographer: true
  })
    .use(markdownItTocAndAnchor, {
      anchorLinkSymbol: ''
    })
    // 目次を一番上に追加
    .render('\n@[toc]\n<br/>\n' + markdownSource)
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

  useEffect(() => {
    getSource(url)
      .then(r => setSource(r))
  }, [url])

  return (
    <Box className={classes.content}>
      <Typography variant={'caption'}>目次</Typography>
      {htmlToReactJsx(applyTOC(source))}
    </Box>
  )
}
