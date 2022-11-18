#DEV
FROM node:16

WORKDIR /api
COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY src ./src
COPY tsconfig.json ./

CMD ["npm", "start"]