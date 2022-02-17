FROM node:14-alpine AS development
ENV NODE_ENV development

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

WORKDIR /app

RUN yarn global add json-server

COPY ./db.json .

ENV FORCE_COLOR=true

EXPOSE 3001
  
CMD [ "json-server", "--port", "3001", "--host", "0.0.0.0", "--watch", "db.json" ]