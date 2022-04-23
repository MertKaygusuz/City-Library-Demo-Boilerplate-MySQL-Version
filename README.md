## Description

City-Library-Demo project (MySQL-typeorm version) for boilerplate. (node version: 16.14.0, npm version: 8.5.2)

## First Steps

Create .env file in root directory. (There is an example file in root directory.)

## Installation

```bash
$ npm install
```

## Running The App

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## After Running

You can seed database: get request -> localhost:3004/seed-data

To delete all data: get request -> localhost:3004/delete-all-data

To see graphql queries, mutations and types: -> localhost:3004/graphql