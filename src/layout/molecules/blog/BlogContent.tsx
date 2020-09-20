import React from 'react'
import { Box } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { BlogContentItem, createUrlByContent } from '../../../blogContent/BlogContentItem'
import { BlogCaptionInfo } from '../../atoms/blog/BlogCaption'
import BlogContentMarkdown from '../../../blogContent/BlogContentMarkdown'
import { BlogContentHeader } from '../../atoms/blog/BlogContentHeader'

const useStyles = makeStyles(theme => createStyles({
  root: {
    maxWidth: 800
  }
}))

interface ContentProps {
  content: BlogContentItem
}

export function BlogContent ({ content }: ContentProps) {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <BlogContentHeader content={content} />
      <BlogContentMarkdown url={createUrlByContent(content)} />
    </Box>
  )
}
