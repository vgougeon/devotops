FROM node:16-alpine

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm install
RUN npm run build

ENTRYPOINT ["node", "./dist/api/main.js"]