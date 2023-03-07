const express = require('express');
const server = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');





server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send('Hello World');
    }
);

server.listen(5050);