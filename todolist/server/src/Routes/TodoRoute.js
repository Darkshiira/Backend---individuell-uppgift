const express = require('express');
const TodoRoute = express.Router();

const { checkAuthentication } = require('../Middlewares/checkAuthentication');
const { AddTodo } = require('../Controllers/ListRoutes/AddTodo');
const { AddTodoList } = require('../Controllers/ListRoutes/AddTodoList');
const { GetTodo } = require('../Controllers/ListRoutes/GetTodo');
const { DeleteTodo } = require('../Controllers/TodoRoutes/DeleteTodo');
const { ShowTodo } = require('../Controllers/TodoRoutes/ShowTodo');
const { AddTodotoList } = require('../Controllers/TodoRoutes/AddTodotoList');
const { GetTodoItem } = require('../Controllers/TodoRoutes/GetTodoItem');
const { PatchTodo } = require('../Controllers/TodoRoutes/PatchTodo');

TodoRoute.post('/addtodo', checkAuthentication, AddTodo);
TodoRoute.post('/addtodolist', checkAuthentication, AddTodoList);
TodoRoute.post('/addnewtodo', checkAuthentication, AddTodotoList)
TodoRoute.get('/', checkAuthentication, GetTodo);
TodoRoute.get('/showtodo', checkAuthentication, ShowTodo);
TodoRoute.get('/item', checkAuthentication, GetTodoItem);
TodoRoute.patch('/', checkAuthentication, PatchTodo);


TodoRoute.delete('/', checkAuthentication, DeleteTodo);
module.exports.TodoRoute  = TodoRoute;