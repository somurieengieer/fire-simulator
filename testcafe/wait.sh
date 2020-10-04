#!/bin/bash

echo "Start wait.sh for waiting for web server"

# 無限ループさせる（while 条件式）
while :
do
  echo "waiting for web server"

  # -w '%{http_code}\n'でレスポンスコードを取得する
  # -Lはリダイレクトを追跡。-Iはヘッダだけ取得。
  # -oは出力ファイル。/dev/nullだとどこにも表示しない
  # -sはsilent。プログレスバーを表示しない
  statusCode=`curl -LI web:3000 -o /dev/null -w '%{http_code}\n' -s`
  if [ $statusCode = "200" ] ; then
    compileStatus=`curl -s web:3000 | grep -cE 'div id="nuxt_loading_screen"'`
    if [ $compileStatus = 0 ] ; then
      break;
    fi
  fi

  # 3秒待つ
  sleep 3;

  continue
done

testcafe chrome:headless --no-sandbox /var/src/test/tests/*.ts