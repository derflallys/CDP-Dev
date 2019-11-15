FROM tiangolo/node-frontend:10 as build-stage

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install

COPY ./ /usr/src/app



RUN npm run build -- --output-path=./dist/out

FROM nginx:1.15
COPY --from=build-stage /usr/src/app/dist/out/ /usr/share/nginx/html


COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf


