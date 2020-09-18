import React from 'react'
import { Box, Chip, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useHistory } from 'react-router'
import { myUrl } from '../../Urls'

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

interface BlogTagBatchProps {
  tag: BlogTag
}

export function BlogTagBatch ({ tag }: BlogTagBatchProps) {
  const history = useHistory()

  function handleClick (e: any) {
    history.push(myUrl.blogListByTag(tag))
    e.preventDefault()
  }

  return (
    <Box onClick={e => handleClick(e)}>
      <Chip label={tag} color="secondary" />
    </Box>
  )
}
