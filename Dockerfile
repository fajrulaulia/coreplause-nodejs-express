FROM alpine:3.14
WORKDIR /usr/src/fajrul
RUN apk --update add redis npm nodejs
COPY . .
RUN npm i
RUN ls
RUN chmod +x start.sh
EXPOSE 3000
ENTRYPOINT ["./start.sh"]