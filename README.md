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