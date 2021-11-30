const express = require("express");
const routerTodo = express.Router();

const {
  createTodo,
  getTodos,
  getTodoById,
  updateById,
  getAllTodos,
  deleteTodos,
  deleteTodosSingleUser
} = require("../controllers/todos");

const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");

routerTodo.post("/createTodo", authentication, createTodo);
routerTodo.get("/getTodo/:id", authentication, getTodos);
routerTodo.get("/getTodoById/:id/:todoId", authentication, getTodoById);
routerTodo.post("/updateById", authentication, updateById);
routerTodo.get("/getAllTodos", authentication, authorization, getAllTodos);
routerTodo.delete("/getAllTodos", authentication, authorization, deleteTodos);
routerTodo.delete("/updateById", authentication, deleteTodosSingleUser);
module.exports = routerTodo;
