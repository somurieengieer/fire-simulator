import React from 'react';
import {useSelector} from "react-redux";
import {FirePattern, selectFirePatterns} from "../../features/fire/fireSlice";
import {Grid} from "@material-ui/core";
import {CompoundInterestChart} from "../atoms/CompoundInterestChart";
import {FirePatternPaper} from "../molecules/FirePatternPaper";
import {Section, SectionContent, SectionList, SectionTitle} from "../atoms/blog/Section";
import {JustifyCenterBox} from "../atoms/JustifyCenterBox";
import {GoogleAdsSmall} from "../../ads/GoogleAdsSmall";
import {Link} from "react-router-dom";
import {myUrl} from "../Urls";

// 複利計算ページ
export default function FirePage() {

  const selectedFirePatterns = useSelector(selectFirePatterns)

  return (
    <>
      <GoogleAdsSmall />
      <JustifyCenterBox width={'800'}>
        <Section maxWidth={800}>
          <SectionTitle>使い方</SectionTitle>
          <SectionContent>
            ※PC推奨<br />
            <br />
            堅実なFIREを実現するためのシミュレーションができます。<br/>
            早期リタイアしたいが、退職後・年休受給開始後に資産がどう推移するか心配な方は多いと思います。<br/>
            また、運用が目標利回りに達しない場合の資産推移も気になると思います。
            本シミュレーターではライフサイクルの変化を加味し、運用利回りが上振れ下振れした際の資産状況もチャート表示することで安心なFIREをサポートします。<br />
            <br/>
            ※資産運用計算方法<br/>
            収入（手取り）・支出・運用利回りを元に簡易的な計算をしているため、預金を含めた資産運用率の設定・運用における税金等を考慮した支出総額・運用利回りを設定してください。<br/>
            手取りが不明な人は<Link to={() => myUrl.tax}>こちら</Link>から計算できます。<br/>
            <br/>
            メジャーなパターンはテンプレートを用意してありますので、テンプレートを選択してから値を書き換えるのがオススメです。<br/>
            "堅実"であるため、30歳での引退のように極端な早期リタイアを目指さず、無理のない生活で40代、50代前半の引退を目指します。<br />
            テンプレートの前提は以下の通りです。
            <SectionList items={[
              '利回り3%運用（堅実運用）',
              '超堅実運用利回り2%且つ平均寿命（86歳）時点でサラリーマンは2000万、個人事業主は3000万の貯蓄がある状態を目標とする',
              '(子供ありの場合のみ)子供は1人。26歳で誕生。投資額が年100万減る',
              '年金は70歳から受給（受給開始年齢が70歳になると悲観的に予想）',
              '引退後60歳までの支出に国民年金・国民健康保険料（年25万）を含む',
              ]} />
          </SectionContent>
        </Section>
      </JustifyCenterBox>
      <Grid>
        {selectedFirePatterns.map((pattern: FirePattern) => (
          <FirePatternPaper firePattern={pattern} key={pattern.patternNumber} />
        ))}
      </Grid>
      <Grid>
        <CompoundInterestChart />
      </Grid>
      <GoogleAdsSmall />
    </>
  );
}

