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
  deleteUsers,
  deleteTodoByAdmin,
  deleteTodosSingleUser,
} = require("../controllers/todos");

const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");

routerTodo.post("/createTodo",authentication, createTodo);
routerTodo.get("/getTodo/:id", authentication,getTodos);
routerTodo.get("/getTodoById/:id/:todoId", authentication, getTodoById);
routerTodo.post("/updateById", authentication,updateById);
routerTodo.delete(
  "/deleteTodosSingleUser/:id",
  deleteTodosSingleUser
);
routerTodo.delete(
  "/deleteTodo/:id/:todoId",
  authentication,
  deleteTodo
);
//for admin
routerTodo.get("/getAllTodos", authentication,authorization, getAllTodos);
routerTodo.delete("/deleteTodos", authentication,authorization,deleteTodos);
routerTodo.delete("/deleteUsers", authentication,authorization, deleteUsers);
routerTodo.delete("/deleteTodoByAdmin", authentication,authorization, deleteTodoByAdmin);
module.exports = routerTodo;
