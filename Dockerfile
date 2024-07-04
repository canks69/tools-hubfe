# Build image
FROM node:20-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3000 

CMD ["serve", "-s", "dist"]