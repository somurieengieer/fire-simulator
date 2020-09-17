import React from 'react'
import { Box, Card, CardContent, Typography } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { BlogTag } from '../../atoms/blog/BlogTag'
import { BlogContentItem, blogContentList } from '../../../blogContent/BlogContentItem'
import { BlogCaptionSmall } from '../../atoms/blog/BlogCaption'
import { SmallHeader } from '../../atoms/blog/SmallHeader'
import { SideBarContentGroup } from '../../atoms/blog/SideBarContentGroup'

interface BlogRecommendContentsProps {
  title: string,
  contents: BlogContentItem[]
}

function BlogRecommendContents ({ title, contents }: BlogRecommendContentsProps) {
  return (
    <SideBarContentGroup>
      <SmallHeader title={title} />
      {contents.map(content => (
        <BlogCaptionSmall {...content} key={content.id} />
      ))}
    </SideBarContentGroup>
  )
}

interface BlogSameTagContentsProps {
  tag: BlogTag
}

export function BlogSameTagContents ({ tag }: BlogSameTagContentsProps) {
  const NUMBER_OF_RECOMMEND_CONTENTS = 5
  // TODO: tagsは１つしかタグを持っていない前提で実装
  const sameTagContents = blogContentList
    .filter(c => c.tag === tag)
    .slice(0, NUMBER_OF_RECOMMEND_CONTENTS)
  return (
    <BlogRecommendContents title='関連記事' contents={sameTagContents} />
  )
}

export function BlogLatestContents () {
  const NUMBER_OF_RECOMMEND_CONTENTS = 5
  // TODO: tagsは１つしかタグを持っていない前提で実装
  const contents = blogContentList
    .slice(0, NUMBER_OF_RECOMMEND_CONTENTS)
  return (
    <BlogRecommendContents title='最新記事' contents={contents}/>
  )
}
