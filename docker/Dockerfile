FROM --platform=linux/amd64 node:14-alpine AS build

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn

COPY . .

RUN yarn build

FROM --platform=linux/amd64 nginx:1.17-alpine

RUN apk --no-cache add curl
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin

RUN apk add --update nodejs
RUN apk add --update npm
RUN npm install -g runtime-env-cra@0.2.4

COPY ./docker/nginx.config /etc/nginx/nginx.template

COPY --from=build /app/.env.example /usr/share/nginx/html/.env
COPY --from=build /app/build /usr/share/nginx/html

CMD ["/bin/sh", "-c", "runtime-env-cra --config-name=/usr/share/nginx/html/runtime-env.js --env-file=/usr/share/nginx/html/.env && envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
