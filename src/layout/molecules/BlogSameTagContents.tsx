import React from 'react'
import { Box, Card, CardContent, Typography } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { BlogTag } from '../atoms/blog/BlogTag'
import { blogContentList } from '../../blogContent/BlogContentItem'
import { BlogCaptionSmall } from '../atoms/blog/BlogCaption'

const useStyles = makeStyles(theme => createStyles({
  root: {
    maxWidth: 800
  },
  header: {
    padding: '0.4rem',
    paddingLeft: '1rem',
    borderRadius: '30px 3px',
    backgroundColor: theme.palette.primary.main
  },
  title: {
    color: '#6594e0', /* 文字色 */
    borderBottom: 'dashed 2px #6594e0',
    fontSize: '1.3rem'
  },
  content: {
    margin: 20,
    [theme.breakpoints.down('sm')]: {
      margin: 5
    }
  }
}))

interface BlogSameTagContentsProps {
  tag: BlogTag
}

export function BlogSameTagContents ({ tag }: BlogSameTagContentsProps) {
  const classes = useStyles()
  const NUMBER_OF_RECOMMEND_CONTENTS = 5
  // TODO: tagsは１つしかタグを持っていない前提で実装
  const sameTagContents = blogContentList
    .filter(c => c.tag === tag)
    .slice(0, NUMBER_OF_RECOMMEND_CONTENTS)
  return (
    <Box>
      <Box className={classes.root}>
        {sameTagContents.map(content => (
          <BlogCaptionSmall {...content} />
        ))}
      </Box>
    </Box>
  )
}
