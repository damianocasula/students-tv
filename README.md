# Student's TV 

A project built as part of the 'Alternanza Scuola-Lavoro' project (from 2016 to 2019). 

## Technologies

- NodeJS
- ExpressJS
- EJS
- MongoDB

## How to deploy

- `npm install`

- create a `db.js` file for MongoDB setup:

```
module.exports = {
  host: '<your-mongodb-host>',
  port: '<your-mongodb-port>',
  name: '<your-db-name>',
  user: '<your-db-user>',
  password: '<your-db-password>'
}
```

- `node app.js` or `nodemon app.js` or `pm2 app.js`
