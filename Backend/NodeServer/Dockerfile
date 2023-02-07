FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm install
ENV MONGO_URL="mongodb://root:root@34.125.170.54:80/?authMechanism=DEFAULT&authSource=shop"
COPY . .
EXPOSE 9000
CMD ["node","index.js"]
