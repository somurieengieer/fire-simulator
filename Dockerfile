FROM node:10.19-alpine  
# FROMは一番最初に書く必要あり。行頭に#がついた行がコメントになるため、コメントは行末でなく下の行に記載する

# docker-compose.ymlのvolumesを使うと実行時にはマウントされるがビルド時にマウントされないのでここでマウントしておく
ADD . /var/src/app/
# WORKDIRはディレクトリが存在しない場合は作成される
WORKDIR /var/src/app

RUN yarn

CMD [ "yarn", "start" ]

# 今回はdocker-compose.ymlのservices.web.volumesでマウントしているが、
# 以下のような書き方でコンテナ上にデータコピーもできる。
# ADD . /code  # .をコンテナ上の/codeにコピーする
# WORKDIR /code

# ADD とCOPYは似ているが、ADDだとリモートからのファイル追加ができ、圧縮ファイルが自動解凍される点が異なる。

