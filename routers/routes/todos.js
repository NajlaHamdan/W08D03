const express=require("express");
const routerTodo=express.Router();

const {createTodo,getTodos,getTodoById}=require("../controllers/todos")

routerTodo.post("/createTodo",createTodo);
routerTodo.get("/getTodo/:id",getTodos);
routerTodo.get("/getTodoById/:id/:todoId",getTodoById);

module.exports=routerTodo;