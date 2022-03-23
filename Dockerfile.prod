FROM rancher/docs:build as build
ENV HUGO_ENV production

WORKDIR /run

COPY config.toml /run/
COPY archetypes archetypes
COPY assets assets
COPY data data
COPY layouts layouts
COPY scripts scripts
COPY content content
COPY static static
COPY .git .git

ADD https://github.com/rancherlabs/website-theme/archive/master.tar.gz /run/master.tar.gz
RUN mkdir -p /output /theme/rancher-website-theme && tar -xzf /run/master.tar.gz -C /run/node_modules/rancher-website-theme --strip=1 && rm /run/master.tar.gz

RUN ["hugo", "--buildFuture", "--baseURL=https://rancher.com/docs", "--destination=/output"]

# Make sure something got built
RUN stat /output/index.html

RUN ["npm","run","build-algolia"]

FROM nginx:alpine
COPY --from=build /output /usr/share/nginx/html/docs/
COPY nginx.conf /etc/nginx/conf.d/default.conf
