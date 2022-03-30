import { Model } from "objection";
import knex from 'knex'

console.log("CONNECTING TO DB")
console.log("HOST", process.env.NX_DB_HOST)
console.log("USER", process.env.NX_DB_USER)
console.log("PASSWORD", process.env.NX_DB_PASSWORD)
console.log("NAME", process.env.NX_DB_NAME)
console.log("PORT", process.env.NX_DB_PORT)
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