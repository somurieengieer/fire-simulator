import React from 'react'
import BlogContent0001 from './BlogContent0001'

export interface BlogContent {
  id: number, // 00001〜99999
  title: string,
  created: string, // YYYY-MM-DD
  contents: React.ReactNode,
}

export const blogContentList: BlogContent[] = [
  {
    id: 0,
    title: 'ブログテスト１',
    created: '2020-09-13',
    contents: (<BlogContent0001 />)
  },
  {
    id: 1,
    title: 'ブログテスト２',
    created: '2020-09-14',
    contents: (<BlogContent0001 />)
  },
  {
    id: 2,
    title: 'ブログテスト３',
    created: '2020-09-15',
    contents: (<BlogContent0001 />)
  }
]
