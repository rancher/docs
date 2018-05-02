FROM rancher/docs:build as build

WORKDIR /run

COPY gulpfile.babel.js /run/
COPY .eslintrc.js /run/
COPY config.toml /run/
COPY netlify.toml /run/
COPY archetypes archetypes
COPY data data
COPY layouts layouts
COPY scripts scripts
COPY content content
COPY src src

ENV HUGO_ENV production

ADD https://github.com/rancherlabs/website-theme/archive/master.tar.gz master.tar.gz
RUN tar -xzf master.tar.gz --strip 1 -C /run/node_modules/rancher-website-theme && rm master.tar.gz
RUN gulp build

# Make sure something got built
RUN stat /run/public/index.html

FROM nginx
COPY --from=build /run/public /usr/share/nginx/html/docs/
COPY nginx.conf /etc/nginx/conf.d/default.conf
