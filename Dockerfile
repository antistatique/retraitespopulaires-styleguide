FROM node:16
RUN mkdir -p /app
WORKDIR /app

COPY ./retraitespopulaires-styleguide/ ./

RUN apt-get update
RUN apt-get install -y --no-install-recommends \
  vim

RUN set -eux; \
  yarn set version latest; \
  # yarn install;\
  yarn cache clean;

RUN npm link gulp

CMD yarn watch-docker
#CMD tail -f /dev/null
