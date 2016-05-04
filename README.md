# Node Server Starter

THIS IS A WORK IN PROGRESS, DON'T USE THIS FOR ANYTHING

A small repo to get started with Node, Express, Sequelize, and Postgres.

## Running Locally:
- install node & postgres
- clone repo
- `npm install`

## Structure

## Existing Models
### User
Attributes:
- `id`
- `email`
- `displayName`
- `password`

Methods:
- `toJSON`
- `validPassword`

Associations: none

## Existing Routes
- `/api/v1/users` `GET`
- `/api/v1/users` `POST`
- `/api/v1/users/:id` `GET`
- `/api/v1/users/:id` `PUT`
- `/api/v1/users/:id` `DELETE`
- `/api/v1/authenticate` `POST`


## Extending with your own data


// TODO
- auto-create database http://stackoverflow.com/questions/31294562/sequelize-create-database
- better error handling in controller https://github.com/sequelize/sequelize/issues/1949 X
- add better logging
- write some tests
- make sure that returned errors are json spec compliant. Standardize somehow. http://jsonapi.org/examples/#error-objects X
- move towards promises for everything
- jwt auth middleware X
- create controllers to simplify routes X
- https://www.airpair.com/node.js/posts/top-10-mistakes-node-developers-make
- https://www.robotlovesyou.com/bdd-tdd/
