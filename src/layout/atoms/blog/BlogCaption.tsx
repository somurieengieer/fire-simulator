import React from 'react'
import { Box, Grid, Paper, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { myUrl } from '../../Urls'
import { BlogTagBatch } from './BlogTag'
import { BlogContentItem } from '../../../blogContent/BlogContentItem'
import { Variant } from '@material-ui/core/styles/createTypography'
import { NonDecoratedLink } from '../NonDecoratedLink'
import WatchLaterIcon from '@material-ui/icons/WatchLater'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      textAlign: 'end',
      color: theme.palette.grey.A700
    }
  })
)

interface BlogCaptionInfoProps {
  content: BlogContentItem,
  tagLinkActive?: boolean
}

export function BlogCaptionInfo ({ content, tagLinkActive } : BlogCaptionInfoProps) {
  const classes = useStyles()

  return (
    <Grid container={true} className={classes.footer}>
      <Grid item={true} xs={6}>
        <BlogTagBatch tag={content.tag} linkActive={tagLinkActive} />
      </Grid>
      <Grid item={true} xs={6} className={classes.footerRight}>
        <Box display='flex' justifyContent='flex-end' alignItems='center'>
          <WatchLaterIcon style={{ fontSize: '1rem' }} />
          &nbsp;
          <Typography>
            {content.created}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

interface BlogCaptionBaseProps {
  titleVariant: Variant,
  content: BlogContentItem
}

export function BlogCaptionBase ({ titleVariant, content }: BlogCaptionBaseProps) {
  const classes = useStyles()

  return (
    <NonDecoratedLink to={myUrl.blogById(content.id)}>
      <Paper className={classes.paper}>
        <Box>
          <Typography variant={titleVariant} className={classes.title}>
            {content.title}
          </Typography>
        </Box>
        <BlogCaptionInfo content={content} />
      </Paper>
    </NonDecoratedLink>
  )
}

export function BlogCaption (content: BlogContentItem) {
  return (<BlogCaptionBase titleVariant={'h6'} content={content} />)
}

export function BlogCaptionSmall (content: BlogContentItem) {
  return (<BlogCaptionBase titleVariant={'body1'} content={content} />)
}
