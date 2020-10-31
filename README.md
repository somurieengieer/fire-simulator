# サマリ

機能は以下の通り

- 資産運用シミュレータ
- 税金計算
- 年金計算

テストは以下の通り

- TestCafe

公開中のサービス: https://fire.somuriengineer.com/

# Usage

起動はyarn start

# ブログ

## ブログの更新方法は以下の通り

- public/blog/にブログを追加
- /src/blogContent/BlogContentItem.tsxに追加（リンクと記事が生成される）

### ブログに画像を貼り付ける

public/image/0000x/2_1.jpg のフォーマットで保存する。10個分の記事を同一ディレクトリに保存する。
画像は縦横の最大が680pxにする。以下コマンドでサイズ縮小してから使用する。

$ sips -Z 680 *

# 使用ライブラリ

普段使わないライブラリは以下の通り

- Recharts.js
- FontAwesome（Loading画像）
- markdown-it
- TestCafe

# 単体テスト（E2Eテストのみ実行する方針にしたため廃止）

単体テストの動作確認としてjest
以下を参考にjestで実装。
各ディレクトリ内に設置された__tests__ディレクトリにテストファイルが置かれている。
https://typescript-jp.gitbook.io/deep-dive/intro-1/jest

実行は $ npx jest で全体実行。
単体で動かすならIntelliJの場合テストロジックの左側の緑実行ボタンから実行できる。

jestのバージョン依存があるため以下をインストールしている。
$ yarn add jest@^24.9.0 babel-jest@^24.9.0

## ESLintへの対応

単体テスト上でESLintエラーが出るので以下対応が必要。  
yarn add eslint-plugin-jest  
.eslintrc.jsの修正（以下を参考）  
http://oisham.hatenablog.com/entry/2019/08/20/111826

単体テスト内でexportしないといけないので export {} をファイル内に記述する。

## コミット時にESLintを走らせる

lint-stagedとhuskeyを使って実現する。  
lint-stagedはgitのstaging環境にある資源に対してスクリプトを実行するnpmパッケージ。  
※staging環境に上がっているファイルのみを対象とする。
huskeyはgitのpre-commit hookの設定をpackage.jsonに書けるようにする。(.git/hooks/pre-commit にスクリプトを書いた場合、プロジェクト内で共有がしにくい)
これらを組み合わせて、コミット時にlint-stagedを動かし、
eslintでスタイル違反しているコードを自動修正・エラー検出を行うことができる。

## enzymeの利用

yarn add --dev enzyme jest-enzyme enzyme-adapter-react-15 @types/enzyme

# E2Eテスト

## TestCafe

TestCafe単体では以下コマンドでE2Eテストを実行できる。
testcafe/以下に画面単位でテストケースを追加する。

```
$ testcafe chrome:headless testcafe/annuityTest.ts 
```

サーバを起動していない場合はdocker-composeでまとめて実行できる。
docker-composeのコマンドは以下の通り。（testcafeにwebが依存しているためwebを起動させてからtestcafeが動く）
docker-compose up でも実行できるが、余計なログ（webのログ）が出たり、実行後に終了しなかったりする。
動きの意図が異なるため以下コマンドを使うのが良い。

```
$ docker-compose build
$ docker-compose run --rm testcafe
```

セットアップ時に参考にしたサイトは以下の通り。  
https://tech.recruit-mp.co.jp/front-end/post-20193/

実行コマンド（動作確認中）

```
$ docker run -v ${TEST_FOLDER}:/tests -it testcafe/testcafe ${TESTCAFE_ARGS}
$ docker run -v testcafe:/tests -it testcafe/testcafe 
```

### CircleCI

CircleCIでCIを実現する。  
ローカルで実行するコマンドは以下の通り

```
$ docker-compose run --build
```

参考にしたサイトは以下の通り。  
https://qiita.com/shindex/items/eeb35dc7200d80ddf397  

### CircleCI結果をSlack通知

Slack Orbsを使ってSlackに通知する。
普通のWebHookの場合はCircleCIにSlackのWebHookURLを設定するだけだが、
Orbsの場合はメッセージ内容やメンションや動く条件などを.circleci/config.ymlに細かく設定できる。
難しくもないのでOrbsを使う方が良さそう。
設定は以下を参考。

https://qiita.com/k_bobchin/items/11f0d778de09502de1f3

## Docker

Dockerの使い方を忘れてしまう。↓以下をさらっと見ると思い出しやすい。
https://www.slideshare.net/zembutsu/docker-underlying-and-containers-lifecycle

docker-composeを使う場合、docker-compose.ymlとDockerfileでどちらに何を書くか方針を決めておいた方が良い。
基本的にDockerfileに書けるものは書く、
それらを組み合わせて上書きするようなものはdocker-compose.ymlに書くのが良い。
ビルド時に必要な処理(実行時ではなくビルド時に必要なファイルのマウントやyarnなど)はDockerfileに書くように注意する。

## SeleniumでE2Eテストを行う（ボツ）

※色々動作検証した結果TestCafeの方がReactと相性良さそうなのでボツ

サーバ構成

Docker上でReact(Node.js)、Seleniumサーバ、テストドライバ(Node.js)を動かす。
テストドライバサーバからSeleniumサーバの4444を経由してSeleniumを操作する。
また、Seleniumサーバの5900でvncが動き、視覚的に動作を確認できる。

WebdriverIO: Node.js上でSelenium WebDriverを操作するライブラリ

### テスト実行方法

ReactとSeleniumサーバを起動する

```
$ docker-compose up --build  // 特にdockerイメージ作成の変更がなければbuildは不要
```

（テスト状況を見たいなら）ブラウザでvnc://localhost:5900を実行し、画面共有を開く

node selenide/execTest.js を実行

### 動かない場合

ポート4444が他で使用されていたりしたことがある。再起動するのが早い。

