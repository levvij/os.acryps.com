FROM node:12-slim

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD [ "node", "main.js" ]