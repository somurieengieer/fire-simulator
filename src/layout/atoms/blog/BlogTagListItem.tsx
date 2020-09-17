import React from 'react'
import { Box, Card, CardContent, Chip, Typography } from '@material-ui/core'
import { BlogTag, blogTags } from './BlogTag'
import { SmallHeader } from './SmallHeader'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { SideBarContentGroup } from './SideBarContentGroup'

const useStyles = makeStyles(theme => createStyles({
  root: {
    maxWidth: 800,
    marginTop: theme.spacing(3)
  }
}))

export function BlogTagListItem () {
  return (
    <SideBarContentGroup>
      <SmallHeader title={'タグ一覧'} />
      {blogTags.map(tag => (
        <Card key={tag}>
          <CardContent>
            <Typography>{tag}</Typography>
          </CardContent>
        </Card>
      ))}
    </SideBarContentGroup>
  )
}
