const express = require('express');
const FriendsRoute = express.Router();
const { checkAuthentication } = require('../Middlewares/checkAuthentication');
const { Getmembers } = require('../Controllers/FriendsRoutes/Getmembers');
const { AddFriend } = require('../Controllers/FriendsRoutes/AddFriend');

FriendsRoute.get('/', checkAuthentication, Getmembers);
FriendsRoute.post('/', checkAuthentication, AddFriend);




module.exports.FriendsRoute = FriendsRoute;