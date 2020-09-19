import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { theme } from '../../materialui/theme'
import { BlogContentItem } from '../../../blogContent/BlogContentItem'
import { BlogLatestContents, BlogSameTagContents } from './BlogRecommendContents'
import { Profile } from '../../atoms/blog/Profile'
import { BlogTagListItem } from '../../atoms/blog/BlogTagListItem'
import { GoogleAdsSmall } from '../../../ads/GoogleAdsSmall'

const useStyles = makeStyles({
  root: {
    marginLeft: 20,
    marginBottom: 5,
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0
    }
  }
})

interface BlogSideBarProps {
  content?: BlogContentItem,
}

// フェーズ表示
export function BlogSideBar ({ content }: BlogSideBarProps) {
  const classes = useStyles()

  return (
    <Grid className={classes.root}>
      <Profile />
      {content && (
        <BlogSameTagContents tag={content.tag} />
      )}
      <GoogleAdsSmall />
      <BlogLatestContents />
      <BlogTagListItem />
      <GoogleAdsSmall />
    </Grid>
  )
}
