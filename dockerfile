FROM node

WORKDIR /app

COPY package* .

COPY tsconfig.json .

RUN npm install

COPY . .

EXPOSE 4005 

CMD ["npm", "start"]