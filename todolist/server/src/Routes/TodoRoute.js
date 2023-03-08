const express = require('express');
const TodoRoute = express.Router();

const { checkAuthentication } = require('../Middlewares/checkAuthentication');
const { AddTodo } = require('../Controllers/TodoRoutes/AddTodo');
const { AddTodoList } = require('../Controllers/TodoRoutes/AddTodoList');
const { GetTodo } = require('../Controllers/TodoRoutes/GetTodo');
const { DeleteTodo } = require('../Controllers/TodoRoutes/DeleteTodo');

TodoRoute.post('/addtodo', checkAuthentication, AddTodo);
TodoRoute.post('/addtodolist', checkAuthentication, AddTodoList);

TodoRoute.get('/', checkAuthentication, GetTodo);

TodoRoute.delete('/', checkAuthentication, DeleteTodo);
module.exports.TodoRoute  = TodoRoute;