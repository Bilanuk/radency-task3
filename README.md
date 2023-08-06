## To Run an application using docker
```bash
docker-compose up --build
```

## To Run an application locally
* configure .env file
```bash
DATABASE_USERNAME=username
DATABASE_PASSWORD=password
DATABASE_NAME=dbname
DATABASE_HOST=localhost
NODE_ENV=development
```

* run
```bash
yarn install
yarn db:init
yarn start
```

check http://localhost:3000
