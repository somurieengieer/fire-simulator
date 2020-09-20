import React from 'react'
import { Box } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { BlogContentItem, createUrlByContent } from '../../../blogContent/BlogContentItem'
import { BlogCaptionInfo } from './BlogCaption'
import BlogContentMarkdown from '../../../blogContent/BlogContentMarkdown'

const useStyles = makeStyles(theme => createStyles({
  root: {
    maxWidth: 800
  },
  header: {
    padding: theme.spacing(2),
    borderRadius: '30px 3px',
    backgroundColor: theme.palette.primary.main
  },
  title: {
    color: '#6594e0', /* 文字色 */
    borderBottom: 'dashed 2px #6594e0',
    fontSize: '1.3rem',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
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

interface ContentProps {
  content: BlogContentItem
}

export function BlogContent ({ content }: ContentProps) {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <ContentHeader content={content} />
      <Box className={classes.content}>
        <BlogContentMarkdown url={createUrlByContent(content)} />
        {/* {children} */}
      </Box>
    </Box>
  )
}

interface ContentHeaderProps {
  content: BlogContentItem
}

export function ContentHeader ({ content }: ContentHeaderProps) {
  const classes = useStyles()
  return (
    <Box>
      <Box className={classes.header}>
        <Box>
          <h1>{content.title}</h1>
        </Box>
        <BlogCaptionInfo content={content} tagLinkActive={true} />
      </Box>
    </Box>
  )
}
