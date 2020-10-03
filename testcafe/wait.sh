#!/bin/bash

echo "start do"

while :
do
  echo "in do"
  statusCode=`curl -LI web:3000 -o /dev/null -w '%{http_code}\n' -s`
  if [ $statusCode = "200" ] ; then
    compileStatus=`curl -s web:3000 | grep -cE 'div id="nuxt_loading_screen"'`
    if [ $compileStatus = 0 ] ; then
      break;
    fi
  fi
  sleep 3;continue
done

testcafe chrome:headless --no-sandbox /var/src/test/tests/*.ts