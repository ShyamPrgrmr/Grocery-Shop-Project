FROM node

WORKDIR /app
COPY package.json .
RUN npm install
RUN npm i aws-sdk

COPY . .
EXPOSE 9000
CMD ["sh","startup.sh"]
