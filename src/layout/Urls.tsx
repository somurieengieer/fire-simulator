import { BlogTag } from './atoms/blog/BlogTag'

export const myUrl = {
  top: '/', // FIREシミュレーターページ

  fukuri: '/fukuri',
  tax: '/tax',
  annuity: '/annuity',
  blogList: '/blog',
  blog: '/blog/:id',
  blogListByTag (tag: BlogTag | string) {
    return `${this.blogList}?cat=${tag}`
  },
  blogById (id: number) {
    return `${this.blogList}/${id}`
  }
}

interface RootUrlTitle {
  rootUrl: string
  title: string
}

export function rootUrlTitleByUrl (url: string): RootUrlTitle {
  const startWith = (str: string): boolean => {
    return url.startsWith(str)
  }

  return [
    { rootUrl: myUrl.tax, title: '税金計算' },
    { rootUrl: myUrl.annuity, title: '年金計算' },
    { rootUrl: myUrl.blogList, title: 'ブログ' },
    { rootUrl: myUrl.top, title: 'FIREシミュレーター' }
  ].find(rootUrlTitle => startWith(rootUrlTitle.rootUrl)) as RootUrlTitle
}
