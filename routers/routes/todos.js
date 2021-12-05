const express = require("express");
const routerTodo = express.Router();

const {
  createTodo,
  getTodos,
  getTodoById,
  updateById,
  getAllTodos,
  deleteTodo,
  deleteTodos,
  deleteTodosSingleUser,
} = require("../controllers/todos");

const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");

routerTodo.post("/createTodo", createTodo);
routerTodo.get("/getTodo/:id", getTodos);
routerTodo.get("/getTodoById/:id/:todoId", authentication, getTodoById);
routerTodo.post("/updateById", updateById);
routerTodo.delete(
  "/deleteTodosSingleUser/:id",
  deleteTodosSingleUser
);
routerTodo.delete(
  "/deleteTodo/:id/:todoId",
  deleteTodo
);
//for admin
routerTodo.get("/getAllTodos", authentication, authorization, getAllTodos);
routerTodo.delete("/deleteTodos", authentication, authorization, deleteTodos);

module.exports = routerTodo;
