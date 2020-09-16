import React from 'react'
import { Box, Chip, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export enum BlogTag {
  FIRE = 'FIRE',
  節税 = '節税',
  // 独り言 = '独り言',
}

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
