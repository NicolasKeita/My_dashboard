FROM node:12.14.1

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY ./ ./

EXPOSE 8080
EXPOSE 3000

CMD ["npm", "start"]
