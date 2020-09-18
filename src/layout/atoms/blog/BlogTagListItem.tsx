import React from 'react'
import { Box, Card, CardContent, Chip, Typography } from '@material-ui/core'
import { BlogTag, blogTags } from './BlogTag'
import { SmallHeader } from './SmallHeader'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { SideBarContentGroup } from './SideBarContentGroup'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { blogContentList } from '../../../blogContent/BlogContentItem'
import { NonDecoratedLink } from '../NonDecoratedLink'
import { myUrl } from '../../Urls'

const useStyles = makeStyles(theme => createStyles({
  list: {
    height: '3rem',
    borderBottom: 'solid 1px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '0.5rem',
    '&:hover': {
      transform: 'translateX(2px)',
      transition: '0.6s',
      opacity: 0.9,
      color: theme.palette.secondary.main
    }
  }
}))

export function BlogTagListItem () {
  const classes = useStyles()
  const countTagContent = (tag: string): number => {
    return blogContentList.filter(b => b.tag === tag).length
  }
  return (
    <SideBarContentGroup>
      <SmallHeader title={'カテゴリー'} />
      {blogTags.map((tag: string) => (
        <NonDecoratedLink to={myUrl.blogListByTag(tag)} key={tag}>
          <Box className={classes.list}>
            <ArrowForwardIosIcon fontSize={'small'} />
            &nbsp;
            <Typography variant={'body1'}>
              {tag} ({countTagContent(tag)})
            </Typography>
          </Box>
        </NonDecoratedLink>
      ))}
    </SideBarContentGroup>
  )
}
