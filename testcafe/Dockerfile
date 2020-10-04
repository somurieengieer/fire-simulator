FROM node:10
MAINTAINER shindex

COPY . /var/src/test
# WORKDIRはDockerfile 内にてその後に続く RUN、CMD、ENTRYPOINT、COPY、ADD の各命令において適用される
# WORKDIRに存在しないディレクトリ名を設定するとディレクトリが作成される
WORKDIR /var/src/test

# RUNはビルド時(Docker Image作成時)にコンテナ内で実行される。(docker build時に動く)
# yum install等を実行すべき。立ち上げで使用するのではなく永続的なインストール等に使用する。
# CMDはRUNに似ているが、コンテナ実行時に動く。（docker run時に動く）
# install google chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install -y google-chrome-stable && \
    # install testcafe
    npm install -g testcafe

CMD [ "sh", "-c", "./wait.sh" ]


#FROM testcafe/testcafe
#
#USER root
#COPY . /var/src/test
# WORKDIRはDockerfile 内にてその後に続く RUN、CMD、ENTRYPOINT、COPY、ADD の各命令において適用される
# WORKDIRに存在しないディレクトリ名を設定するとディレクトリが作成される
#WORKDIR /var/src/test

# RUNはビルド時(Docker Image作成時)にコンテナ内で実行される。(docker build時に動く)
# yum install等を実行すべき。立ち上げで使用するのではなく永続的なインストール等に使用する。
# CMDはRUNに似ているが、コンテナ実行時に動く。（docker run時に動く）
#RUN set -x \
#  && apk update \
#  && apk add --no-cache yarn \
#  && yarn

#CMD [ "sh", "-c", "./wait.sh" ]
#CMD [ "chrome", "/var/src/test/tests/*.ts"]