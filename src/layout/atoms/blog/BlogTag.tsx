import React from 'react'
import { Box } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { BlogContentItem, blogContentList } from '../../../blogContent/BlogContentItem'

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

export enum BlogTag {
  FIRE,
  // 節税,
  // 独り言,
}

interface SameTagContentsProps {
  tag: BlogTag
}

export function SameTagContents ({ tag }: SameTagContentsProps) {
  const classes = useStyles()
  const NUMBER_OF_RECOMMEND_CONTENTS = 5
  const sameTagContents = blogContentList
    .filter(c => c.tags.includes(tag))
    .slice(0, NUMBER_OF_RECOMMEND_CONTENTS)
  return (
    <Box>
      <Box className={classes.root}>
        {sameTagContents.map(content => (
          <Box key={content.id}>
            <h6>{content.title}</h6>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
