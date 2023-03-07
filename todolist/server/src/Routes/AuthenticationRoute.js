const express = require('express');
const AuthenticationRoute = express.Router();
const { Login } = require('../Controllers/Login');
const { Register } = require('../Controllers/Register');


AuthenticationRoute.post('/login', Login);

AuthenticationRoute.post('/register', Register);

module.exports.AuthenticationRoute  = AuthenticationRoute ;