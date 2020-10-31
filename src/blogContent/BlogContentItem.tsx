import { BlogTag } from '../layout/atoms/blog/BlogTag'

export interface BlogContentItem {
  id: number, // 00001〜99999
  title: string,
  created: string, // YYYY-MM-DD
  tag: BlogTag
}

function zeroPadding (length: number, originalNumber: number): string {
  return (Array(length).join('0') + originalNumber).slice(-length)
}

export function createUrlByContent (content: BlogContentItem): string {
  return `/blog/blog${zeroPadding(5, content.id)}.md`
}

// 新しい記事が上
export const blogContentList: BlogContentItem[] = [
  {
    id: 2,
    title: '郡山市近辺の温泉（二岐温泉）',
    created: '2020-10-31',
    tag: BlogTag.FIRE
  },
  {
    id: 1,
    title: 'FIRE後の家計簿と積み立て試算',
    created: '2020-09-21',
    tag: BlogTag.FIRE
  },
  {
    id: 0,
    title: '堅実にFIREを実現する',
    created: '2020-09-20',
    tag: BlogTag.FIRE
  }
]
