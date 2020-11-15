FROM node:10.15.2-alpine
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000
CMD [ "node", "index.js" ]