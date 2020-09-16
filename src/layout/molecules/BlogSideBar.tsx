import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { theme } from '../materialui/theme'
import { BlogContentItem } from '../../blogContent/BlogContentItem'
import { BlogSameTagContents } from './BlogSameTagContents'
import { SmallHeader } from '../atoms/blog/SmallHeader'

const useStyles = makeStyles({
  root: {
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 5,
    padding: theme.spacing(0.5),
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0
    }
  }
})

interface BlogSideBarProps {
  content: BlogContentItem,
}

// フェーズ表示
export function BlogSideBar ({ content }: BlogSideBarProps) {
  const classes = useStyles()

  return (
    <Grid className={classes.root}>
      <SmallHeader title={'関連記事'} />
      <BlogSameTagContents tag={content.tag} />
    </Grid>
  )
}
