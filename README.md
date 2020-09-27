# 機能

# ブログ

## ブログの更新方法は以下の通り

- public/blog/にブログを追加
- /src/blogContent/BlogContentItem.tsxに追加（リンクと記事が生成される）

# 使用ライブラリ

いつもと違うライブラリは以下の通り

- Recharts.js
- FontAwesome（Loading画像）

# 単体テスト

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

# Docker起動

以下コマンドで起動する

```
$ docker-compose up --build
```

# Gradle

依存関係の更新：　$ gradle build

# SeleniumでE2Eテストを行う

サーバ構成

Docker上でReact(Node.js)、Seleniumサーバ、テストドライバ(Node.js)を動かす。
テストドライバサーバからSeleniumサーバの4444を経由してSeleniumを操作する。
また、Seleniumサーバの5900でvncが動き、視覚的に動作を確認できる。

WebdriverIO: Node.js上でSelenium WebDriverを操作するライブラリ

## テスト実行方法

ReactとSeleniumサーバを起動する

```
$ docker-compose up --build  // 特にdockerイメージ作成の変更がなければbuildは不要
```

（テスト状況を見たいなら）ブラウザでvnc://localhost:5900を実行し、画面共有を開く

node selenide/execTest.js を実行

### 動かない場合

ポート4444が他で使用されていたりしたことがある。再起動するのが早い。
