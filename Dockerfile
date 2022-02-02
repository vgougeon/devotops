FROM node:16-alpine

ARG NX_GITHUB_SECRET
ARG NX_GITHUB_CLIENT_ID
ARG NX_GITHUB_REDIRECT_URI

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN ls

RUN echo $NX_GITHUB_SECRET

# RUN npm install
# RUN npm run build

# RUN ls


# ENTRYPOINT ["node", "./dist/apps/api/main.js"]