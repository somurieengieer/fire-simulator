import React from 'react'
import { Section, SectionTitle } from '../atoms/blog/Section'
import { blogContentList } from '../../blogContent/BlogContentItem'
import { useParams } from 'react-router'
import { BlogContent } from '../atoms/blog/Content'
import { JustifyCenterBox } from '../atoms/JustifyCenterBox'
import { BlogSideBar } from '../molecules/BlogSideBar'
import { Grid } from '@material-ui/core'
import BlogSideBarFrame from '../molecules/blog/BlogSideBarFrame'

export default function BlogPage () {
  // @ts-ignore
  const { id } = useParams()

  try {
    const blog = blogContentList.find(c => c.id === Number(id))

    if (blog) {
      return (
        <BlogSideBarFrame blog={blog}>
          <BlogContent content={blog}>
            {blog.content}
          </BlogContent>
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