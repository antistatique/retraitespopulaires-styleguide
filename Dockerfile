FROM node:8

RUN mkdir -p /app
WORKDIR /app


#RUN set -eux; \
#  yarn set version latest; \
#  yarn install;\
#  yarn cache clean;

RUN apt-get update
RUN apt-get install -y --no-install-recommends \
  vim

RUN npm install
#RUN npm build
#RUN npm rebuild node-sass --force
#CMD ["npm", "start"]
CMD tail -f /dev/null
