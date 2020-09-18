import React from 'react'
import { Box, Chip, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useHistory } from 'react-router'
import { myUrl } from '../../Urls'
import { NonDecoratedLink } from '../NonDecoratedLink'

export enum BlogTag {
  FIRE = 'FIRE',
  節税 = '節税',
  // 独り言 = '独り言',
}

export const blogTags = (function () {
  const results = []
  for (const tag in BlogTag) {
    results.push(tag)
  }
  return results
})()

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  })
)

interface BlogTagBatchProps {
  tag: BlogTag,
  linkActive?: boolean
}

export function BlogTagBatch ({ tag, linkActive }: BlogTagBatchProps) {
  const classes = useStyles()
  const history = useHistory()

  function handleClick (e: any) {
    if (linkActive) {
      history.push(myUrl.blogListByTag(tag))
      e.preventDefault()
    }
  }

  const batchJsx = (
    <Box onClick={e => handleClick(e)}>
      <Chip label={tag} color="secondary" className={classes.root} />
    </Box>
  )

  if (linkActive) {
    return (
      <NonDecoratedLink to={myUrl.blogListByTag(tag)}>
        {batchJsx}
      </NonDecoratedLink>
    )
  }
  return batchJsx
}
