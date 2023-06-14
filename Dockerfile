FROM node

WORKDIR /dzen-api

COPY package.json /dzen-api

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "dist/server.js"]
