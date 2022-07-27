FROM node:16.16-alpine3.16 as builder

ENV NODE_ENV build

WORKDIR /home/node

COPY . /home/node
RUN chmod 777 -R /home/node/
RUN npm i
RUN npm install -g npm@8.15.0
RUN yarn nx build messenger --configuration=production

FROM node:16.16-alpine3.16

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/node_modules/ /home/node/node_modules/
COPY --from=builder /home/node/dist/apps/messenger/ /home/node/dist/

CMD ["node", "dist/main.js"]