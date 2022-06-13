FROM node:16-alpine

RUN mkdir -p /app
WORKDIR /app

COPY ./.yarn ./.yarn
ADD ./package.json ./yarn.lock ./.yarnrc.yml ./

RUN set -eux; \
  yarn install;

CMD ["npm run dev-server --port 9090"]
