FROM node:18-alpine

WORKDIR /user/src/app_nest

COPY package.json package-lock.json ./

COPY ./.env ./.env

RUN npm install

RUN npm install @nestjs/config --save

COPY . .

RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "start:prod"]