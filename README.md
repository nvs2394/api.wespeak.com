# Hapi Starter Kit | Hapi based REST application boilerplate, uses async/await

## Overview
A lean boilerplate application for building RESTful APIs (Microservice) in Node.js using [hapi.js](https://github.com/hapijs/hapi).
Follows industry standard best practices, and uses latest [async/await](https://blog.risingstack.com/mastering-async-await-in-nodejs/) ES8 feature.
Bring your own front-end.
Plug-in your own Database.


## Requirements
 - [node.js](https://nodejs.org/en/download/current/) >= `8.4.0`
 - [yarn](https://yarnpkg.com/en/docs/install) >= `0.27.5`
 - [docker](https://docs.docker.com/engine/installation/#supported-platforms)
    - Docker is optional and is required only if you want to develop and deploy using Docker

## Getting Started
```bash
# Install dependencies
$ yarn
```

```bash
# Start Server
# Set environment variables defined in `config/custom-environment-variables.json` like `OPEN_WEATHER_API_KEY=xxx`
$ yarn start
```

```bash
# Try GET /ping to make sure server is up
$ curl http://localhost:3030/ping
```

## Docker

#### Development
```bash
# copy sample.dev.env to dev.env
$ cp bin/sample.dev.env bin/dev.env
```

```bash
# Start Server
$ bash bin/development.sh
```

## Environment Configuration
[config](https://github.com/lorenwest/node-config) is used to configure application.
- Default values of environment variables, which are common across all environments can be configured via `config/default.json`
- Values specific to a particular environment can be set by creating a file with same name in config directory. Like `config/test/json` for test environment.
- `config/custom-environment-variables` is used to read values from environment variables. For ex. if `APP_PORT` env var is set it can be accessed as `config.get('app.port')`.
You can read more on custom environment variables [here](https://github.com/lorenwest/node-config/wiki/Environment-Variables#custom-environment-variables).

## More Tasks
```bash
# Run lint
yarn lint
```

## Deployment
- Simply set environment variables defined in `bin/sample.dev.env` in your own environment (AWS, Heroku etc) and `yarn start`

#### Docker
- Build the docker image
    - `docker build -t wespeak-api .`
- Start Docker Container
    - `docker run -d -p 3000:3000 --name wespeak-api wespeak-api` 

## Documentation
- `hapi-swagger` self documents all the APIs.
- Visit `http://localhost:3030/documentation` to access the documentation after starting the server.

## Miscellaneous
- To turn off logs getting logged via `good-console` in development environment, remove it from `plugins.js`

### How to get data from API
-Header : Authorization : Bearer +  token 