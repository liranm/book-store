# Book Store

A Book store app

## Getting Started

To run this application, you'll need [Node.js](https://nodejs.org/en/download/) and [MongoDB](https://www.mongodb.com/download-center/community) installed on your computer.


You can quickly install and run mongoDB server using [Docker](https://docs.docker.com/install/):
```
$ docker run --name some-mongo -d -p 27017:27017 mongo:4.0.5
``` 

When having running mongoDB server on default port 27017:

```
# Clone this repository
$ git clone https://github.com/liranm/book-store

# Go into the server app
$ cd book-store/server

# Install dependencies
$ npm install

# Run the server app
$ npm start

# Go into the client app
$ cd book-store/client

# Install dependencies
$ npm install

# Run the client app
$ npm start
```

Open in browser http://localhost:8000.
