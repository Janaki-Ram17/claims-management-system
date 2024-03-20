FROM node:18-alpine3.19

WORKDIR /application

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

CMD ["npm", "run", "dev"]