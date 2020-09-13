import React from 'react'
import { Section, SectionTitle } from '../atoms/blog/Section'
import { blogContentList } from '../../blogContent/BlogContent'
import { useParams } from 'react-router'

export default function BlogPage () {
  // @ts-ignore
  const { id } = useParams()

  try {
    const blog = blogContentList.find(c => c.id === Number(id))

    if (blog) {
      return (
        <Section maxWidth={800}>
          <SectionTitle>{blog.title}</SectionTitle>
          <SectionTitle>{blog.created}</SectionTitle>
          {blog.contents}
        </Section>
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
