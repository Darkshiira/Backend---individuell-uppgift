const express = require('express');
const ListRoute = express.Router();

const { checkAuthentication } = require('../Middlewares/checkAuthentication');
const { AddTodo } = require('../Controllers/ListRoutes/AddTodo');
const { AddTodoList } = require('../Controllers/ListRoutes/AddTodoList');
const { GetTodo } = require('../Controllers/ListRoutes/GetTodo');
const { DeleteList } = require('../Controllers/ListRoutes/DeleteList');

ListRoute.post('/addtodo', checkAuthentication, AddTodo);
ListRoute.post('/addtodolist', checkAuthentication, AddTodoList);
ListRoute.get('/', checkAuthentication, GetTodo);
ListRoute.delete('/', checkAuthentication, DeleteList);

module.exports.ListRoute = ListRoute;