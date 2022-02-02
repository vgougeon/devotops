FROM node:16-alpine

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN ls

RUN npm install
RUN npm run build

RUN ls

ENTRYPOINT ["node", "./dist/apps/api/main.js"]