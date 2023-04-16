## Structure

```txt
| docs: "Swagger documentation"
| src    
|- api
|- config
|- db
|- loaders
|- models
|- services
|- tests
|- types
|
```

## DEVELOPMENT

### How to start

1. Install [Nodejs](https://nodejs.org/es/):

We highly recommend to manage it through [nvm](https://github.com/nvm-sh/nvm)

2. We use yarn and typescript so install it globlally, also sequelize-cli-typescript will be needed

```sh
npm install -g yarn
yarn global add typescript
yarn global add "git+ssh://git@github.com:wildcookie007/sequelize-cli-typescript.git#master"
```

3. Database

For development the database runs locally via [Docker](docker.com) and [Docker Compose](https://github.com/docker/compose)

```sh
docker-compose --env-file /dev/null up
```

1. Install dependencies

```sh
yarn install
```

5. Get .env file

Check the .env.example file and create a .env file with the same variables

6. Install [nodemon](github.com/remy/nodemon) globally
```sh
yarn global add nodemon
```

7. For develop

```sh
yarn dev
```

which will run nodemon and tsc