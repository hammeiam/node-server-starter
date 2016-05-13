# Node Server Starter

THIS IS A WORK IN PROGRESS, DON'T USE THIS FOR ANYTHING

A small repo to get started with Node, Express, Sequelize, and Postgres. This project is designed to provide the bare essentials needed to start a new node project using popular and well-documented tools.

## Running Locally:
- install node & postgres
- clone repo
- `npm install`

## Structure

## What's in the box
### Logging
Logging is done with [Winston](https://github.com/winstonjs/winston) and [Morgan](https://github.com/expressjs/morgan) which create json logs of requests and errors. These are sent to the console in dev and prod, and saved to a log file in prod. Winston and Morgan are both very popular, battle-tested, and well-documented tools that are used in tons of production Node apps. For a detailed comparison of loggers, view [this link](https://www.loggly.com/ultimate-guide/node-logging-basics/)

Right now all logs are saved to `logs/all-logs.log` in prod, but you can split this into multiple files by level (info, warn, error, etc) by adding more transports. You can also split log files by date with the [winston-daily-rotate-file](https://github.com/winstonjs/winston-daily-rotate-file) module.

### Authentication
Why Passport?
Why JWT?

### Postgres + Sequelize
Why Postgres?
Why Sequelize?

### Tests

## Existing Models
### User
Attributes:
- `id`
- `email`
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

## Deploying


// TODO
- auto-create database http://stackoverflow.com/questions/31294562/sequelize-create-database
- better error handling in controller https://github.com/sequelize/sequelize/issues/1949 X
- add better logging X
- write some tests
- make sure that returned errors are json spec compliant. Standardize somehow. http://jsonapi.org/examples/#error-objects X
- move towards promises for everything
- jwt auth middleware X
- create controllers to simplify routes X
- https://www.airpair.com/node.js/posts/top-10-mistakes-node-developers-make
- https://www.robotlovesyou.com/bdd-tdd/
