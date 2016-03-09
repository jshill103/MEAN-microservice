FROM centos:centos6

RUN yum install -y epel-release
RUN yum install -y nodejs npm

COPY package.json /node_server/package.json
RUN cd /node_server; npm install

COPY . /node_server

EXPOSE 8080
CMD ["node", "/node_server/index.js"]
