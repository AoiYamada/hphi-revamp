FROM node:22.10-alpine as base

FROM base as builder

WORKDIR /home/node/app
COPY package*.json ./

COPY . .
RUN pnpm install
RUN pnpm build

FROM base as runtime

ENV NODE_ENV=production

WORKDIR /home/node/app
COPY package*.json  ./
COPY pnpm-lock.yaml ./

RUN pnpm install --prod

EXPOSE 3000

CMD ["node", "dist/server.js"]
