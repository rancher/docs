FROM rancher/docs:latest as prod

FROM rancher/docs:build

COPY --from=prod /usr/share/nginx/html/docs/final.algolia.json /run
WORKDIR /run
COPY package.json package.json
COPY scripts scripts

ENTRYPOINT ["yarn","run","publish-algolia"]
