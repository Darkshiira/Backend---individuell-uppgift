const express = require('express');
const server = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const { ListRoute } = require('./Routes/ListRoute');
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

server.use(express.json());
server.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));
server.use(cookieParser());

server.use('/auth', AuthenticationRoute);
server.use('/todo', TodoRoute)
server.use('/members', FriendsRoute)
server.use('/list', ListRoute)


server.listen(5050);