FROM mongo
EXPOSE 80
ENV MONGO_INITDB_ROOT_USERNAME: root
ENV MONGO_INITDB_ROOT_PASSWORD: root
ENV MONGO_INITDB_DATABASE: shop
COPY ./mongo-init.js /docker-entrypoint-initdb.d/mongo-init.js
