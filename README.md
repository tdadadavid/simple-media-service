<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Simple media service for storing audio and images contents

## Technologies used
    * Nodejs(Typescript)
    * Nestjs
    * Sequelize(Mysql)
    * Cloudinary(for storing media files)

## Setup 
```bash
$ npm install
```

## Running the app

```bash
# copy the values in the example files to .env
$ cp .env.example .env

# development
$ npm run start

# watch mode
$ npm run start:dev
```
## Docker
```bash
$ docker build -t stereo-service .
$ docker run -dp 3000:3000 stereo-service 
```