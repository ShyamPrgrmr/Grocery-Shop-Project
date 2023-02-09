FROM node

#Copy credes
COPY creads.csv creads.csv

#Setting AWS SES
RUN apt-get -y update; apt-get -y install curl
RUN apt-get -y update; apt-get -y install unzip
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install
#RUN aws configure import --csv file://creads.csv

COPY config /.aws/config

#ENV AWS_SDK_LOAD_CONFIG=1

WORKDIR /app
COPY package.json .
RUN npm install
RUN npm i aws-sdk


COPY . .
EXPOSE 9000
CMD ["sh","startup.sh"]

#CMD ["node","index.js"]
