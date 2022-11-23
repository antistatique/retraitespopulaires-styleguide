FROM node:16
RUN mkdir -p /app
WORKDIR /app

COPY ./retraitespopulaires-styleguide/ ./

RUN apt-get update
RUN apt-get install -y --no-install-recommends \
  vim

COPY ./retraitespopulaires-styleguide/ssl/Cisco_Umbrella_Root_CA.crt /usr/local/share/ca-certificates/Cisco_Umbrella_Root_CA.crt
COPY ./retraitespopulaires-styleguide/ssl/RetraitesPopulairesProxyCA.crt /usr/local/share/ca-certificates/RetraitesPopulairesProxyCA.crt
COPY ./retraitespopulaires-styleguide/ssl/RetraitesPopulairesRootCA.crt /usr/local/share/ca-certificates/RetraitesPopulairesRootCA.crt
COPY ./retraitespopulaires-styleguide/ssl/RetraitesPopulairesSubCA.crt /usr/local/share/ca-certificates/RetraitesPopulairesSubCA.crt
RUN chmod 644 /usr/local/share/ca-certificates/Cisco_Umbrella_Root_CA.crt
RUN chmod 644 /usr/local/share/ca-certificates/RetraitesPopulairesProxyCA.crt
RUN chmod 644 /usr/local/share/ca-certificates/RetraitesPopulairesRootCA.crt
RUN chmod 644 /usr/local/share/ca-certificates/RetraitesPopulairesSubCA.crt
RUN update-ca-certificates

RUN set -eux; \
  yarn set version latest; \
  # yarn install;\
  yarn cache clean;

RUN npm config set strict-ssl false -g
RUN yarn config set "strict-ssl" false -g
RUN npm link gulp

CMD yarn watch-docker
#CMD tail -f /dev/null
