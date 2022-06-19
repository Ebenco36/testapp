# testapp Instructions

> clone this repository and run the command below
```
npm install
```

## The command above will install all required node packages

> Set up your database on **MYSQL** 

## Copy .env.example to .env using the command below

```
cp .env.example .env
```

### Set DB configuration settings from the .env file.

### Once the steps above is done, execute the command below to migrate your DB

```
npx sequelize-cli db:migrate
```

### You can undo migration with the command below

```
npx sequelize-cli db:migrate:undo
```

**For more info goto https://sequelize.org/docs/v6/other-topics/migrations/**

## Finally start your application

```
node index.js
```

## If you have nodemon install globally, you can run the command below to monitor changes

```
nodemon index.js
```

*Note: This can be pushed directly to Heroku.*