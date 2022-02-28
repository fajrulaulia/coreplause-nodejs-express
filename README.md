# Coreplause Backend

this backend create using express, websocket server and Redis, for serve https://github.com/fajrulaulia/coreplause-react-native as client and make sure keep realtime to get data when in usage

##  API Documentation
https://documenter.getpostman.com/view/7847501/UVXjLcLa

## how to start
- pull this repo
- run `docker-compose up -d` 
- run `npm start`


## Image
for image, you can pull and run using dockcer-compose or dockerfile docker pull faawidia/coreplause, application and redis has been bundle in one image
resource : https://hub.docker.com/r/faawidia/coreplause
### Image Usage
  ``` bash
  docker run -d -p 3000:3000 faawidia/coreplause:latest # running on port 3000
  ```
  run it in postman swithc to API Documentation
