FROM node:16
RUN mkdir -p /app
WORKDIR /app

COPY ./retraitespopulaires-styleguide/ ./

RUN set -eux; \
  yarn set version latest; \
  yarn install;\
  yarn cache clean;

RUN apt-get update
RUN apt-get install -y --no-install-recommends \
  vim

#RUN npm install
RUN npm run build
RUN npm link gulp
CMD ["npm", "watch"]
# CMD ["npm run dev-server --port=9090"]
# CMD tail -f /dev/null
