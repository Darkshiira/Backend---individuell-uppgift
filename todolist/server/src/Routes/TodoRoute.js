const express = require('express');
const TodoRoute = express.Router();

const { checkAuthentication } = require('../Middlewares/checkAuthentication');
const { DeleteTodo } = require('../Controllers/TodoRoutes/DeleteTodo');
const { ShowTodo } = require('../Controllers/TodoRoutes/ShowTodo');
const { AddTodotoList } = require('../Controllers/TodoRoutes/AddTodotoList');
const { GetTodoItem } = require('../Controllers/TodoRoutes/GetTodoItem');
const { PatchTodo } = require('../Controllers/TodoRoutes/PatchTodo');


TodoRoute.post('/addnewtodo', checkAuthentication, AddTodotoList)


TodoRoute.get('/showtodo', checkAuthentication, ShowTodo);
TodoRoute.get('/item', checkAuthentication, GetTodoItem);
TodoRoute.patch('/', checkAuthentication, PatchTodo);


TodoRoute.delete('/', checkAuthentication, DeleteTodo);
module.exports.TodoRoute  = TodoRoute;