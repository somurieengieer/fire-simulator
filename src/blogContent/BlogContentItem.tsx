import React from 'react'
import BlogContent0001 from './BlogContent0001'

export interface BlogContentItem {
  id: number, // 00001〜99999
  title: string,
  created: string, // YYYY-MM-DD
  content: React.ReactNode,
}

export const blogContentList: BlogContentItem[] = [
  {
    id: 0,
    title: 'ブログテスト１',
    created: '2020-09-13',
    content: (<BlogContent0001 />)
  },
  {
    id: 1,
    title: 'ブログテスト２',
    created: '2020-09-14',
    content: (<BlogContent0001 />)
  },
  {
    id: 2,
    title: 'ブログテスト３',
    created: '2020-09-15',
    content: (<BlogContent0001 />)
  }
]
