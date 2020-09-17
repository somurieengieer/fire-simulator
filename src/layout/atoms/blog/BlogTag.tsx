import React from 'react'
import { Box, Chip, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

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
  return (
    <Box>
      <Chip label={tag} color="secondary" />
    </Box>
  )
}
