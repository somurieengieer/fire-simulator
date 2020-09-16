import React, { useEffect, useState } from 'react'
import { BlogContentItem, blogContentList } from '../../blogContent/BlogContentItem'
import { useLocation } from 'react-router'
import BlogSideBarFrame from '../molecules/blog/BlogSideBarFrame'
import { BlogCaption } from '../atoms/blog/BlogCaption'

export default function BlogListPage () {
  const location = useLocation()
  const NUMBER_OF_SHOW_ITEMS = 10
  const [blogList, setBlogList] = useState<BlogContentItem[]>()

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
    <BlogSideBarFrame>
      {blogList?.map(content =>
        <BlogCaption {...content} key={content.id} />
      )}
    </BlogSideBarFrame>

  )
}
