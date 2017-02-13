FROM nginx

RUN apt-get update && \
  apt-get install -y curl git && \
  rm -rf /var/lib/apt/lists/*

# gpg keys listed at https://github.com/nodejs/io.js
RUN gpg --keyserver pool.sks-keyservers.net --recv-keys \
  9554F04D7259F04124DE6B476D5A82AC7E37093B \
  DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
  FD3A5288F042B6850C66B31F09FE44734EB7990E \
  94AE36675C464D64BAFA68DD7434390BDBE9B9C5

ENV NPM_CONFIG_LOGLEVEL info
ENV IOJS_VERSION 3.0.0


RUN curl -SLO "https://iojs.org/dist/v$IOJS_VERSION/iojs-v$IOJS_VERSION-linux-x64.tar.gz" \
  && curl -SLO "https://iojs.org/dist/v$IOJS_VERSION/SHASUMS256.txt.asc" \
  && gpg --verify SHASUMS256.txt.asc \
  && grep " iojs-v$IOJS_VERSION-linux-x64.tar.gz\$" SHASUMS256.txt.asc | sha256sum -c - \
  && tar -xzf "iojs-v$IOJS_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 \
  && rm "iojs-v$IOJS_VERSION-linux-x64.tar.gz" SHASUMS256.txt.asc


RUN mkdir /build
WORKDIR /build

RUN npm install -g bower grunt-cli
COPY package.json /build/
RUN npm install
COPY . /build

RUN chown -R nginx /build
# A bit of a hack
RUN mkdir /nonexistent
RUN chown nginx /nonexistent
USER nginx
RUN bower install -p
RUN grunt prod

USER root
RUN cp -r /build/prod/* /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html/

