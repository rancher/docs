FROM node:8-alpine

RUN apk update && apk add py-pygments bash git asciidoc gcompat && rm -rf /var/cache/apk/*

# Download and install hugo
ENV HUGO_VERSION 0.54.0
ENV HUGO_BINARY hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz

ADD https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/${HUGO_BINARY} /tmp/hugo.tar.gz
RUN tar xzf /tmp/hugo.tar.gz -C /tmp \
  && mv /tmp/hugo /usr/local/bin/ \
  && rm /tmp/hugo.tar.gz \
  && mkdir -p /run

WORKDIR /run
COPY package.json /run/
COPY yarn.lock /run/

RUN yarn
