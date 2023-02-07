#FROM node:14-alpine3.16
#WORKDIR /app
#COPY package.json .
#RUN npm install
#COPY . .
#EXPOSE 3006
#CMD ["npm","start"]



FROM node:14-alpine3.16

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
#RUN npm run build


#FROM nginx:alpine
#WORKDIR /usr/share/nginx/html
#RUN rm -rf ./*
#COPY --from=builder /app/build .
#VOLUME ./nginx.conf:/etc/nginx/nginx.conf 
ENV NODE_SERVER_ENDPOINT="http://34.118.241.84:9000"
ENV PYTHON_SERVER_ENDPOINT="http://34.118.241.84:3000"
#ENTRYPOINT ["nginx", "-g", "daemon off;"]


WORKDIR /app/src

COPY startup.sh startup.sh

RUN sh startup.sh

WORKDIR /app

CMD ["npm","start"]

EXPOSE 80

EXPOSE 3000
#CMD ["npm","start"]


#FROM node:14-alpine3.16 AS builder
#WORKDIR /app
#COPY package.json .
#RUN npm install
#COPY . .
#RUN npm run build



#FROM nginx:alpine
#WORKDIR /usr/share/nginx/html
#RUN rm -rf ./*
#COPY --from=builder /app/build .
#VOLUME ./nginx.conf:/etc/nginx/nginx.conf 

#ENTRYPOINT ["nginx", "-g", "daemon off;"]

#EXPOSE 80

#EXPOSE 3000
#CMD ["npm","start"]
