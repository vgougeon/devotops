import { Model } from "objection";
import knex from 'knex'

const db = knex({
  client: 'mysql2',
  useNullAsDefault: true,
  connection: {
    host : process.env.NX_DB_HOST,
    user : process.env.NX_DB_USER,
    password : process.env.NX_DB_PASSWORD,
    database : process.env.NX_DB_NAME,
    port: +process.env.NX_DB_PORT
  }
});
Model.knex(db)
export default db;