FROM node:alpine

WORKDIR /Frontend

COPY ./package*.json ./

RUN npm install --production

COPY ./ ./

RUN npm run build

EXPOSE 3000

USER node

CMD [ "npm", "start" ]
