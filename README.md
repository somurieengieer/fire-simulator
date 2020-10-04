# サマリ

機能は以下の通り

- 資産運用シミュレータ
- 税金計算
- 年金計算

テストは以下の通り

- TestCafe

公開中のサービス: https://fire.somuriengineer.com/


# ブログ

## ブログの更新方法は以下の通り

- public/blog/にブログを追加
- /src/blogContent/BlogContentItem.tsxに追加（リンクと記事が生成される）

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


## enzymeの利用

yarn add --dev enzyme jest-enzyme enzyme-adapter-react-15 @types/enzyme

# E2Eテスト

## TestCafe

TestCafe単体では以下コマンドでE2Eテストを実行できる。
testcafe/以下に画面単位でテストケースを追加する。

```
$ testcafe chrome:headless testcafe/annuityTest.ts 
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

