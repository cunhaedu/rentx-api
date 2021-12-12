![logo](public/application_logo.png)

# Rentx

Car rental API developed during Ignite bootcamp from [Rocketseat](https://www.rocketseat.com.br/).

## :pushpin: Content Table

* [Features](#rocket-features)
* [Api Documentation](#open_book-api-documentation)
* [Application Requirements](#closed_book-application-requirements)
* [Database Model](#clipboard-database-model)
* [Api Status Codes](#vertical_traffic_light-api-status-codes)
* [First steps](#construction_worker-first-steps)
* [Getting Started Without Docker](#runner-getting-started-without-docker)
* [Getting Started With Docker](#runner-getting-started-with-docker)
* [Build](#runner-build)
* [Technologies](#rocket-technologies)
* [License](#closed_book-license)

## :rocket: Features

* Car specifications CRUD
* Car categories CRUD
* Car CRUD
* Car rental
* Users CRUD

## :open_book: Api Documentation

Once you got this application running on your machine
you can go to [localhost:3000/api_docs](http://localhost:3000/api_docs)
to see the full api documentation built with [swagger](https://swagger.io/)

## :closed_book: Application Requirements

Check out the [REQUIREMENTS](./REQUIREMENTS.md) page to see the full application requirements
such as Business Rules and function and non-function requirements

## :clipboard: Database model

![model](public/erd.png)

## :vertical_traffic_light: API Status Codes

Check the following status codes in this API:

| Status Code | Description |
|:------------| :--- |
| 200         | `OK` |
| 201         | `CREATED` |
| 400         | `BAD REQUEST` |
| 422         | `UNPROCESSABLE ENTITY` |
| 404         | `NOT FOUND` |
| 500         | `INTERNAL SERVER ERROR` |

## :construction_worker: First steps

**To clone this project via HTTPS, you can run the following command:**

```
git clone https://github.com/cunhaedu/rentx-api.git
```

Create your environment variables based on the examples of `.env.example`

```
cp .env.example .env
```

## :runner: Getting Started without Docker

**Install dependencies**

```
yarn install
```
Or
```
npm install
```

**Setup a database**

Install [Postgres](https://www.postgresql.org/) to create a database, then you should modify the ```.env``` with your credentials

Run the transactions in order to configure the database schema:
```
yarn typeorm migration:run
```

Run the following command in order to start the application in a development environment:
```
yarn dev:server
```

**Once you have following all these previous commands your application will be available
in localhost on Port 3000**

## :runner: Getting Started with Docker

**To run this application with Docker you need to have [Docker](https://docs.docker.com/)
and [docker-compose](https://docs.docker.com/compose/) installed in your machine.
Furthermore, you also need an account in [Docker Hub](https://hub.docker.com/) in order to run docker commands**

Once you have docker configured in your machine run the following commands:

```bash
docker build -t rentx .
```

```bash
docker-compose up
```

## :runner: Build
Run the following command in order to convert the .ts file to .js file in a folder called dist:
```
yarn build
```

Run the following command in order to start the application in a production environment:
```
yarn start
```

## :rocket: Technologies

This project use the following technologies:

* [Nodejs](https://nodejs.org/en/)
* [Typescript](https://www.typescriptlang.org/)
* [Express](http://expressjs.com/)
* [TSyringe](https://www.npmjs.com/package/tsyringe)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [JsonWebToken](https://jwt.io/)
* [Docker](https://docs.docker.com/)
* [TypeORM](https://typeorm.io)
* [PostgreSQL](https://www.postgresql.org/)
* [Jest](https://jestjs.io/)
* [Swagger](https://swagger.io/)

## :closed_book: License

This project is under MIT License.See the [LICENSE](./LICENSE) file for more details.
