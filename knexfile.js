require('dotenv').config()

module.exports = {
  development: {
    client: 'mysql2',
    useNullAsDefault: true,
    connection: {
      host: process.env.NX_DB_HOST,
      database: process.env.NX_DB_NAME,
      user: process.env.NX_DB_USER,
      password: process.env.NX_DB_PASSWORD,
      port: process.env.NX_DB_PORT
    },
    migrations: {
      directory: "./migrations"
    }
  },
  production: {
    client: 'mysql2',
    useNullAsDefault: true,
    connection: {
      host: process.env.NX_DB_HOST,
      database: process.env.NX_DB_NAME,
      user: process.env.NX_DB_USER,
      password: process.env.NX_DB_PASSWORD,
      port: process.env.NX_DB_PORT
    },
    migrations: {
      directory: "./migrations"
    }
  },
};