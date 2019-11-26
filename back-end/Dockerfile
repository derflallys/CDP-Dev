FROM node:10

RUN mkdir -p /app/src

WORKDIR /app

COPY package.json  /app
COPY .babelrc  /app
COPY nodemon.json  /app
COPY test-db-setup.js  /app
COPY ./src /app/src

RUN npm install

EXPOSE 3000



CMD ["npm","run","prod"]
