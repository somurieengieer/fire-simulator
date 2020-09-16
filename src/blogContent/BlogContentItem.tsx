import React from 'react'
import BlogContent0001 from './BlogContent0001'
import { BlogTag } from '../layout/atoms/blog/BlogTag'

export interface BlogContentItem {
  id: number, // 00001〜99999
  title: string,
  created: string, // YYYY-MM-DD
  tag: BlogTag
  content: React.ReactNode,
}

// 新しい記事が上
export const blogContentList: BlogContentItem[] = [
  {
    id: 2,
    title: 'ブログテスト３',
    created: '2020-09-15',
    tag: BlogTag.FIRE,
    content: (<BlogContent0001 />)
  },
  {
    id: 1,
    title: 'ブログテスト２',
    created: '2020-09-14',
    tag: BlogTag.節税,
    content: (<BlogContent0001 />)
  },
  {
    id: 0,
    title: 'ブログテスト１',
    created: '2020-09-13',
    tag: BlogTag.FIRE,
    content: (<BlogContent0001 />)
  }
]
