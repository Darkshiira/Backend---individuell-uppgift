const express = require('express');
const AuthenticationRoute = express.Router();
const { Login } = require('../Controllers/AuthenticationControllers/Login');
const { Register } = require('../Controllers/AuthenticationControllers/Register');
const { VerifyFriends } = require('../Controllers/ProfileRoutes/VerifyFriends');
const { VerifyTodo } = require('../Controllers/ProfileRoutes/VerifyTodo');
const { checkAuthentication } = require('../Middlewares/checkAuthentication');


AuthenticationRoute.post('/login', Login);

AuthenticationRoute.post('/register', Register);

AuthenticationRoute.get('/verifyfriends', checkAuthentication, VerifyFriends);
AuthenticationRoute.get('/verifytodo', checkAuthentication, VerifyTodo);

module.exports.AuthenticationRoute  = AuthenticationRoute ;