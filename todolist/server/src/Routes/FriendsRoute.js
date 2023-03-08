const express = require('express');
const FriendsRoute = express.Router();
const { checkAuthentication } = require('../Middlewares/checkAuthentication');
const { Getmembers } = require('../Controllers/FriendsRoutes/Getmembers');
const { AddFriend } = require('../Controllers/FriendsRoutes/AddFriend');
const { Friendprofile } = require('../Controllers/FriendsRoutes/Friendprofile');

FriendsRoute.get('/', checkAuthentication, Getmembers);
FriendsRoute.post('/', checkAuthentication, AddFriend);
FriendsRoute.get('/profile', checkAuthentication, Friendprofile);




module.exports.FriendsRoute = FriendsRoute;