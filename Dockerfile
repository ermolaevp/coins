FROM node:9-alpine
RUN mkdir /www
WORKDIR /www
COPY ./dist .
EXPOSE 3377
CMD [ "node", "server.js" ]
