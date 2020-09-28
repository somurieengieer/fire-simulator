FROM testcafe/testcafe

USER root
COPY . /var/src/test
WORKDIR /var/src/test
RUN set -x \
  && apk update \
  && apk add --no-cache yarn \
  && yarn