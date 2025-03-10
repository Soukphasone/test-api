
FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g ts-node typescript

RUN npm install -g nodemon 

COPY . .

# EXPOSE 5406

CMD [ "npm", "start" ]
