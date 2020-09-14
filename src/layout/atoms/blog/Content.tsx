import React from 'react'
import { Box } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { BlogContentItem } from '../../../blogContent/BlogContentItem'
import { SectionTitle } from './Section'

const useStyles = makeStyles(theme => createStyles({
  root: {
    maxWidth: 800
  },
  header: {
    margin: 20,
    marginBottom: 60,
    [theme.breakpoints.down('sm')]: {
      margin: 10
    }
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

interface ContentProps {
  content: BlogContentItem
  children: React.ReactNode;
}

export function BlogContent ({ content, children }: ContentProps) {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <ContentHeader content={content} />
      <Box className={classes.content}>
        {children}
      </Box>
    </Box>
  )
}

interface ContentHeaderProps {
  content: BlogContentItem
}

export function ContentHeader ({ content }: ContentHeaderProps) {
  // const classes = useStyles()
  return (
    <Box>
      <SectionTitle>{content.title}</SectionTitle>
      <SectionTitle>{content.created}</SectionTitle>
    </Box>
  )
}
