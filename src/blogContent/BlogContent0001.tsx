import React from 'react'
import { SectionContent, SectionList, SectionTitle } from '../layout/atoms/blog/Section'

export default function BlogContent0001 () {
  return (
    <>
      <SectionTitle>セクションタイトル</SectionTitle>
      <SectionContent>
        おおまかに老後の年金受給額を計算できます。おおまかなので全て万円表記です。<br/>
        厚生年金は納付年数と平均標準報酬額の入力欄が4つあるので必要に応じて使用してください。<br/>
        細かい計算は端折っているので詳細な計算用途では使用しないよう注意してください。<br/>
        細かい仕様は以下の通りです。<br/>
        <SectionList items={[
          '昭和16年4月2日以後に生まれた方向け',
          '65歳から84歳の間20年間年金を受給',
          '保険料は令和2年度をベースに計算',
          '10年〜40年納付前提'
        ]}/>
      </SectionContent>
    </>
  )
}
