import React, { useEffect, useState } from 'react'
import { BlogContentItem, blogContentList } from '../../blogContent/BlogContentItem'
import { useLocation } from 'react-router'
import { Box, Grid, Paper, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { myUrl } from '../Urls'
import { BlogTagBatch } from '../atoms/blog/BlogTag'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: 'none'
    },
    root: {
      margin: theme.spacing(1),
      padding: theme.spacing(2)
    },
    title: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2)
    },
    footer: {
      alignItems: 'center'
    },
    footerRight: {
      paddingRight: '3rem',
      textAlign: 'end'
    }
  })
)

export function BlogCaptionInfo (content: BlogContentItem) {
  const classes = useStyles()

  return (
    <Grid container className={classes.footer}>
      <Grid item sm={6}>
        <BlogTagBatch tag={content.tag} />
      </Grid>
      <Grid item sm={6} className={classes.footerRight}>
        <Typography>
          {content.created}
        </Typography>
      </Grid>
    </Grid>
  )
}

function BlogCaption (content: BlogContentItem) {
  const classes = useStyles()

  return (
    <Link to={myUrl.blogById(content.id)} className={classes.link}>
      <Paper className={classes.root}>
        <Box>
          <h3 className={classes.title}>{content.title}</h3>
        </Box>
        <BlogCaptionInfo {...content} />
      </Paper>
    </Link>
  )
}
export default function BlogListPage () {
  const location = useLocation()
  const NUMBER_OF_SHOW_ITEMS = 10
  const [blogList, setBlogList] = useState<BlogContentItem[]>()

  const page = () => {
    const getParams = new URLSearchParams(location.search)
    const pageNumber = Number(getParams.get('page') || 0)
    return pageNumber > maxPage ? maxPage : pageNumber
  }
  const maxPage = (blogContentList.length + NUMBER_OF_SHOW_ITEMS - 1) / NUMBER_OF_SHOW_ITEMS

  useEffect(() => {
    const startContentIndex = page() * NUMBER_OF_SHOW_ITEMS
    let endContentIndex = startContentIndex + NUMBER_OF_SHOW_ITEMS
    if (endContentIndex > blogContentList.length) {
      endContentIndex = blogContentList.length
    }
    setBlogList(blogContentList.slice(startContentIndex, endContentIndex))
  }, [location])

  return (
    <>
      {blogList?.map(content =>
        <BlogCaption {...content} key={content.id} />
      )}
    </>

  )
}
