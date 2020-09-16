import React from 'react'
import { Box, Grid, Paper, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { myUrl } from '../../Urls'
import { BlogTagBatch } from './BlogTag'
import { BlogContentItem } from '../../../blogContent/BlogContentItem'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: 'none'
    },
    paper: {
      marginBottom: theme.spacing(1),
      padding: theme.spacing(2),
      '&:hover': {
        transform: 'translateY(-2px)',
        transition: '0.6s',
        opacity: 0.9
      }
    },
    title: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2)
    },
    footer: {
      alignItems: 'center'
    },
    footerRight: {
      paddingRight: '2rem',
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

export function BlogCaption (content: BlogContentItem) {
  const classes = useStyles()

  return (
    <Box style={{ width: '100%' }}>
      <Link to={myUrl.blogById(content.id)} className={classes.link}>
        <Paper className={classes.paper}>
          <Box>
            <h3 className={classes.title}>{content.title}</h3>
          </Box>
          <BlogCaptionInfo {...content} />
        </Paper>
      </Link>
    </Box>
  )
}

export function BlogCaptionSmall (content: BlogContentItem) {
  const classes = useStyles()

  return (
    <Box>
      <Link to={myUrl.blogById(content.id)} className={classes.link}>
        <Paper className={classes.paper}>
          <Box>
            <Typography variant='body1' className={classes.title}>
              {content.title}
            </Typography>
          </Box>
          <BlogCaptionInfo {...content} />
        </Paper>
      </Link>
    </Box>
  )
}
