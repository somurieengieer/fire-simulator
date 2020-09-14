import React from 'react'
import { Box } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { BlogContentItem } from '../../../blogContent/BlogContentItem'

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
  const classes = useStyles()
  return (
    <Box>
      <Box className={classes.header}>
        <Box>
          <h1>{content.title}</h1>
        </Box>
        <Box display="flex" flexDirection="row-reverse">
          <Box style={{ marginRight: '3rem', marginBottom: '1rem' }}>
            {content.created}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
