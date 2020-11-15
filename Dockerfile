FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm Install

COPY . .

EXPOSE 5000
CMD [ "node", "index.js" ]