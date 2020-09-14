import React, { useEffect, useState } from 'react'
import { BlogContent, blogContentList } from '../../blogContent/BlogContent'
import { useLocation } from 'react-router'
import { Box, Paper } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { myUrl } from '../Urls'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: 'none'
    },
    root: {
      margin: theme.spacing(1)
    },
    header: {
      paddingLeft: theme.spacing(2),
      paddingTop: theme.spacing(1)
    },
    footer: {
      paddingBottom: theme.spacing(1),
      paddingRight: theme.spacing(2)
    }
  })
)

function BlogCaption (content: BlogContent) {
  const classes = useStyles()

  return (
    <Link to={myUrl.blogById(content.id)} className={classes.link}>
      <Paper className={classes.root}>
        <Box className={classes.header}>
          <h3>{content.title}</h3>
        </Box>
        <Box display="flex" flexDirection="row-reverse" className={classes.footer}>
          <Box>
            {content.created}
          </Box>
        </Box>
      </Paper>
    </Link>
  )
}
export default function BlogListPage () {
  const location = useLocation()
  const NUMBER_OF_SHOW_ITEMS = 10
  const [blogList, setBlogList] = useState<BlogContent[]>()

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
