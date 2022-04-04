FROM rancher/docs:build
ENV HUGO_ENV dev

VOLUME ["/run/archetypes", "/run/assets", "/run/content", "/run/data", "/run/layouts", "/run/scripts", "/run/static", "/run/.git"]
WORKDIR /run

ADD https://github.com/rancherlabs/website-theme/archive/master.tar.gz /run/master.tar.gz
RUN mkdir -p /output /theme/rancher-website-theme && tar -xzf /run/master.tar.gz -C /run/node_modules/rancher-website-theme --strip=1 && rm /run/master.tar.gz

# Expose default hugo port
EXPOSE 9001

ENTRYPOINT ["hugo", "serve", "--bind=0.0.0.0", "--buildDrafts", "--buildFuture", "--baseURL=" ]
