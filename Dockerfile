
FROM node:14
# Install Oracle Instant Client
RUN apt-get update && apt-get install -y libaio1 && \
    curl -o instantclient.zip https://download.oracle.com/otn_software/instantclient/instantclient-basic-linux.x64-21.10.0.0.0.zip && \
    unzip -o instantclient.zip -d /opt/oracle && rm instantclient.zip && \
    echo "/opt/oracle" > /etc/ld.so.conf.d/oracle-instantclient.conf && ldconfig

# Set environment variable for Node.js
ENV LD_LIBRARY_PATH /opt/oracle

WORKDIR /usr/src/app

COPY package*.json ./


RUN npm install

RUN npm install -g ts-node typescript

RUN npm install -g nodemon 

COPY . .

CMD [ "npm", "start" ]
