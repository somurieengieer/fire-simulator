import React from 'react'
import {useSelector} from 'react-redux'
import {JustifyCenterBox} from '../atoms/JustifyCenterBox'
import {AnnuitySet, selectAnnuity} from '../../features/annuity/annuitySlice'
import {AnnuityTable} from '../molecules/AnnuityTable'
import {GoogleAdsSmall} from '../../ads/GoogleAdsSmall'
import {Section, SectionContent, SectionList, SectionTitle} from '../atoms/blog/Section'
import {Box, Grid} from '@material-ui/core'

export default function AnnuityPage () {
  const selectedAnnuity: AnnuitySet[] = useSelector(selectAnnuity)

  return (
    <>
      <GoogleAdsSmall/>
      <JustifyCenterBox width={'800'}>
        <Section maxWidth={800}>
          <SectionTitle>使い方</SectionTitle>
          <SectionContent>
            ※PC推奨<br/>
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
        </Section>
      </JustifyCenterBox>
      <JustifyCenterBox>
        <Box>
          <Grid container>
            {selectedAnnuity && selectedAnnuity.map((annuitySet: AnnuitySet) => (
              <Grid item xs={12} md={4}>
                <AnnuityTable annuity={annuitySet}/>
              </Grid>
            ))}
          </Grid>
        </Box>
      </JustifyCenterBox>
    </>
  )
}
