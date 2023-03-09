const express = require('express');
const AuthenticationRoute = express.Router();
const { Login } = require('../Controllers/AuthenticationControllers/Login');
const { Register } = require('../Controllers/AuthenticationControllers/Register');
const { VerifyFriends } = require('../Controllers/ProfileRoutes/VerifyFriends');
const { VerifyTodo } = require('../Controllers/ProfileRoutes/VerifyTodo');
const { checkAuthentication } = require('../Middlewares/checkAuthentication');
const { Verify } = require('../Controllers/AuthenticationControllers/Verify');
const { Logout } = require('../Controllers/AuthenticationControllers/Logout');


AuthenticationRoute.post('/login', Login);
AuthenticationRoute.get('/logout', checkAuthentication, Logout);
AuthenticationRoute.post('/register', Register);

AuthenticationRoute.get('/verifyfriends', checkAuthentication, VerifyFriends);
AuthenticationRoute.get('/verifytodo', checkAuthentication, VerifyTodo);
AuthenticationRoute.get('/verify', checkAuthentication, Verify);


module.exports.AuthenticationRoute  = AuthenticationRoute ;