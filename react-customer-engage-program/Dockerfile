FROM node:16-alpine3.14 as build

RUN mkdir -p /dcep-updated

WORKDIR /dcep-updated

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000 

CMD ["npm", "start"]
