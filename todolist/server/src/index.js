const express = require('express');
const server = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { AuthenticationRoute } = require('./Routes/AuthenticationRoute');
const { TodoRoute } = require('./Routes/TodoRoute');
const { FriendsRoute } = require('./Routes/FriendsRoute');

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

  const { Model } = require("objection");
  Model.knex(knex);

  class Users extends Model {
    static get tableName() {
      return "user";
    }
  };

  server.use(cookieParser());
server.use(express.json());
server.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));

server.use('/auth', AuthenticationRoute);
server.use('/todo', TodoRoute)
server.use('/members', FriendsRoute)


server.listen(5050);