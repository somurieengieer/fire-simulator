import React from 'react'
import {useSelector} from 'react-redux'
import {FirePattern, selectFirePatterns} from '../../features/fire/fireSlice'
import {Grid} from '@material-ui/core'
import {CompoundInterestChart} from '../atoms/CompoundInterestChart'
import {FirePatternPaper} from '../molecules/FirePatternPaper'
import {Section, SectionContent, SectionTitle} from '../atoms/blog/Section'
import {JustifyCenterBox} from '../atoms/JustifyCenterBox'
import {GoogleAdsSmall} from '../../ads/GoogleAdsSmall'
import {Link} from 'react-router-dom'
import {myUrl} from '../Urls'

// 複利計算ページ
export default function FirePage () {
  const selectedFirePatterns = useSelector(selectFirePatterns)

  return (
    <>
      <GoogleAdsSmall/>
      <JustifyCenterBox width={'800'}>
        <Section maxWidth={800}>
          <SectionTitle>使い方</SectionTitle>
          <SectionContent>
            ※PC推奨<br/>
            <br/>
            堅実なFIREを実現するためのシミュレーターです。<br/>
            ライフサイクルの変化による収支を元に運用利回りが上振れ下振れした際の資産状況をチャート表示することで安全・安心なFIREをサポートします。<br/>
            <br/>
            ※資産運用計算方法<br/>
            収入（手取り）・支出・運用利回りを元に簡易的な計算をしているため、預金を含めた資産運用率の設定・運用における税金等を考慮した支出総額・運用利回りを設定してください。<br/>
            手取りが不明な人は<Link to={() => myUrl.tax}>こちら</Link>から計算できます。<br/>
            <br/>
            メジャーなパターンはテンプレートを用意してありますので、テンプレートを選択してから値を書き換えてください。<br/>
            テンプレートでは利回り3%±1%のチャートを表示します。
          </SectionContent>
        </Section>
      </JustifyCenterBox>
      <Grid>
        {selectedFirePatterns.map((pattern: FirePattern) => (
          <FirePatternPaper firePattern={pattern} key={pattern.patternNumber}/>
        ))}
      </Grid>
      <Grid>
        <CompoundInterestChart/>
      </Grid>
      <GoogleAdsSmall/>
    </>
  )
}
