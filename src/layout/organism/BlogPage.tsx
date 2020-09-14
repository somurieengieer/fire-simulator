import React from 'react'
import { Section, SectionTitle } from '../atoms/blog/Section'
import { blogContentList } from '../../blogContent/BlogContentItem'
import { useParams } from 'react-router'
import { BlogContent } from '../atoms/blog/Content'

export default function BlogPage () {
  // @ts-ignore
  const { id } = useParams()

  try {
    const blog = blogContentList.find(c => c.id === Number(id))

    if (blog) {
      return (
        <BlogContent content={blog}>
          {blog.content}
        </BlogContent>
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
