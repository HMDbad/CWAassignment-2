FROM node:18.16.1-alpine3.18

RUN mkdir -p /app
WORKDIR /app

RUN npm install nodemon -g

# port to change if port is taken 
EXPOSE 5003
CMD echo 1; npm install; echo 2; npx nodemon app.js