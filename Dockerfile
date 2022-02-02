FROM node:16-alpine

COPY . /usr/src/app
WORKDIR /usr/src/app

ARG NX_GITHUB_SECRET
ARG NX_GITHUB_CLIENT_ID
ARG NX_GITHUB_REDIRECT_URI
ARG NX_DB_HOST
ARG NX_DB_NAME
ARG NX_DB_USER
ARG NX_DB_PASSWORD
ARG NX_DB_PORT

ENV NX_GITHUB_SECRET=$NX_GITHUB_SECRET
ENV NX_GITHUB_CLIENT_ID=$NX_GITHUB_CLIENT_ID
ENV NX_GITHUB_REDIRECT_URI=$NX_GITHUB_REDIRECT_URI
ENV NX_DB_HOST=$NX_DB_HOST
ENV NX_DB_NAME=$NX_DB_NAME
ENV NX_DB_USER=$NX_DB_USER
ENV NX_DB_PASSWORD=$NX_DB_PASSWORD
ENV NX_DB_PORT=$NX_DB_PORT

RUN npm install
# RUN npm run build
RUN whoami
RUN npm run db

ENTRYPOINT ["node", "./dist/apps/api/main.js"]