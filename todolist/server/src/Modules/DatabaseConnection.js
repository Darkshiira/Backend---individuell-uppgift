const dotenv = require('dotenv').config();

const knex = require("knex")({
    client: "mysql2",
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE_NAME,
    },
    pool: { min: 0, max: 7 },
  });

  

  module.exports.knex;