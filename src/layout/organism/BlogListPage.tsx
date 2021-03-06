import React, { useEffect, useState } from 'react'
import { BlogContentItem, blogContentList } from '../../blogContent/BlogContentItem'
import { useLocation } from 'react-router'
import BlogSideBarFrame from '../molecules/blog/BlogSideBarFrame'
import { BlogCaption } from '../atoms/blog/BlogCaption'
import { blogTags } from '../atoms/blog/BlogTag'
import { BlogListFilter } from '../molecules/blog/BlogListFilter'
import { Box, Grid, Paper, Typography } from '@material-ui/core'

export default function BlogListPage () {
  const location = useLocation()
  const NUMBER_OF_SHOW_ITEMS = 10
  const LATEST_CONTENT = '最新記事'
  const [filterLabel, setFilterLabel] = useState<string>(LATEST_CONTENT)
  // フィルターされた記事全量
  const [contentList, setContentList] = useState<BlogContentItem[]>(blogContentList)

  const page = () => {
    const getParams = new URLSearchParams(location.search)
    const pageNumber = Number(getParams.get('page') || 0)
    return pageNumber > maxPage ? maxPage : pageNumber
  }
  const maxPage = (blogContentList.length + NUMBER_OF_SHOW_ITEMS - 1) / NUMBER_OF_SHOW_ITEMS

  const filterLabels = (): string[] => {
    return [LATEST_CONTENT, ...blogTags]
  }

  const updateContentByFilter = () => {
    let filteredContents = blogContentList
    if (filterLabel !== LATEST_CONTENT) {
      filteredContents = filteredContents.filter(b => b.tag === filterLabel)
    }
    setContentList(filteredContents)
  }

  // ページング時に現ページで表示すべきコンテンツ
  const pagedShowContent = (): BlogContentItem[] => {
    const startContentIndex = page() * NUMBER_OF_SHOW_ITEMS
    let endContentIndex = startContentIndex + NUMBER_OF_SHOW_ITEMS

    if (endContentIndex > contentList.length) {
      endContentIndex = contentList.length
    }
    return contentList.slice(startContentIndex, endContentIndex)
  }

  useEffect(() => {
    updateContentByFilter()
  }, [filterLabel])

  useEffect(() => {
    const getParams = new URLSearchParams(location.search)
    const category = getParams.get('cat')
    if (category && filterLabels().includes(category)) {
      setFilterLabel(category)
    }
    updateContentByFilter()
  }, [location])

  return (
    <BlogSideBarFrame>
      <BlogListFilter filterLabels={filterLabels()}
        activeLabel={filterLabel}
        callbackForUpdate={(label: string) => setFilterLabel(label)} />

      <Grid container={true} style={{ width: '100%' }}>
        {pagedShowContent().map(content =>
          <Grid item={true} xs={12} key={content.id}>
            <BlogCaption {...content} key={content.id} />
          </Grid>
        )}
        {pagedShowContent().length === 0 && (
          <Grid item={true} xs={12}>
            <Typography variant={'h6'}>
              記事がありません
            </Typography>
          </Grid>
        )}
      </Grid>
    </BlogSideBarFrame>

  )
}
