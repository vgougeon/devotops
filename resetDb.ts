require('dotenv').config();
const Knex = require('knex');
const db = Knex({
  client: 'mysql2',
  connection: {
    host : process.env.NX_DB_HOST,
    user : process.env.NX_DB_USER,
    password : process.env.NX_DB_PASSWORD,
    port: process.env.NX_DB_PORT
  }
});


db.raw(`DROP DATABASE ${process.env.NX_DB_NAME}`)
.then(() => console.debug(`DEV - DROP DATABASE ${process.env.NX_DB_NAME}`))
.catch(() => console.debug(`DEV - DATABASE DOES NOT EXIST ${process.env.NX_DB_NAME}`))
.then(() => db.raw(`CREATE DATABASE ${process.env.NX_DB_NAME}`))
.then(() => console.debug(`DEV - CREATE DATABASE ${process.env.NX_DB_NAME}`))
.catch(() => console.debug(`DEV - DATABASE COULDN'T BE CREATED ${process.env.NX_DB_NAME}`))
.then(() => process.exit())
