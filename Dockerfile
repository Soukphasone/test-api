
FROM node:14
# Install dependencies (e.g., curl, libaio)
RUN apk add --no-cache \
  libaio \
  curl

# Set Oracle Instant Client version and URL
ENV ORACLE_INSTANT_CLIENT_VERSION=19.11
ENV ORACLE_INSTANT_CLIENT_URL=https://download.oracle.com/otn_software/linux/instantclient/1911000/instantclient-basic-linux.x64-${ORACLE_INSTANT_CLIENT_VERSION}.zip

# Download and install Oracle Instant Client
RUN curl -L ${ORACLE_INSTANT_CLIENT_URL} -o /tmp/instantclient.zip && \
  unzip /tmp/instantclient.zip -d /opt && \
  rm /tmp/instantclient.zip && \
  ln -s /opt/instantclient_${ORACLE_INSTANT_CLIENT_VERSION} /opt/instantclient && \
  ln -s /opt/instantclient/sqlplus /usr/bin/sqlplus && \
  ln -s /opt/instantclient/ld.so.1 /usr/lib/

# Set the Oracle environment variables
ENV LD_LIBRARY_PATH /opt/instantclient:${LD_LIBRARY_PATH}
ENV TNS_ADMIN /opt/instantclient


WORKDIR /usr/src/app

COPY package*.json ./


RUN npm install

RUN npm install -g ts-node typescript

RUN npm install -g nodemon 

COPY . .

CMD [ "npm", "start" ]
