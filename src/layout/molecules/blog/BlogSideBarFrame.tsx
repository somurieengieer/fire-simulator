import React from 'react'
import { Grid } from '@material-ui/core'
import { BlogContentItem } from '../../../blogContent/BlogContentItem'
import { JustifyCenterBox } from '../../atoms/JustifyCenterBox'
import { BlogSideBar } from './BlogSideBar'
import { GoogleAdsSmall } from '../../../ads/GoogleAdsSmall'

interface Props {
  blog?: BlogContentItem,
  children: React.ReactNode
}

export default function BlogSideBarFrame ({ blog, children }: Props) {
  return (
    <JustifyCenterBox>
      <Grid container>
        <Grid item sm={12} md={8}>
          <JustifyCenterBox width={'800'}>
            <GoogleAdsSmall />
            {children}
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
