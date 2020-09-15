import React from 'react'
import { Section, SectionTitle } from '../atoms/blog/Section'
import { blogContentList } from '../../blogContent/BlogContentItem'
import { useParams } from 'react-router'
import { BlogContent } from '../atoms/blog/Content'
import { JustifyCenterBox } from '../atoms/JustifyCenterBox'
import { BlogSideBar } from '../molecules/BlogSideBar'
import { Grid } from '@material-ui/core'

export default function BlogPage () {
  // @ts-ignore
  const { id } = useParams()

  try {
    const blog = blogContentList.find(c => c.id === Number(id))

    if (blog) {
      return (
        <JustifyCenterBox>
          <Grid container>
            <Grid item sm={12} md={8}>
              <JustifyCenterBox>
                <BlogContent content={blog}>
                  {blog.content}
                </BlogContent>
              </JustifyCenterBox>
            </Grid>
            {/* // TODO: サイドバーの横幅は不変にしたい */}
            <Grid item md={4}>
              <BlogSideBar content={blog} />
            </Grid>
          </Grid>
        </JustifyCenterBox>
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
