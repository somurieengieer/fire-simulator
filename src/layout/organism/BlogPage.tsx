import React from 'react'
import { Section, SectionTitle } from '../atoms/blog/Section'
import { blogContentList } from '../../blogContent/BlogContentItem'
import { useParams } from 'react-router'
import { BlogContent } from '../molecules/blog/BlogContent'
import BlogSideBarFrame from '../molecules/blog/BlogSideBarFrame'
import { BASE_TITLE } from '../../common/common'

export default function BlogPage () {
  // @ts-ignore
  const { id } = useParams()

  try {
    const blog = blogContentList.find(c => c.id === Number(id))

    if (blog) {
      document.title = `${blog.title} | ${BASE_TITLE}`
      return (
        <BlogSideBarFrame blog={blog}>
          <BlogContent content={blog} />
        </BlogSideBarFrame>
      )
    }
  } finally {
  }
  return (
    <Section maxWidth={800}>
      <SectionTitle>Contents Not Found</SectionTitle>
    </Section>
  )
}
