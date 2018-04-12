FROM rancherlabs/website:build as build

WORKDIR /run

COPY --from=rancherlabs/website-theme:latest /src/website-theme /run/node_modules/rancher-website-theme
COPY gulpfile.babel.js /run/
COPY .eslintrc.js /run/
COPY config.toml /run/
COPY netlify.toml /run/
COPY archetypes archetypes
COPY content content
COPY data data
COPY layouts layouts
COPY src src

ENV HUGO_ENV production

RUN gulp build

# Make sure something got built
RUN stat /run/public/index.html

FROM nginx
COPY --from=build /run/public /usr/share/nginx/html/
