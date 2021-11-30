const express=require("express");
const routerTodo=express.Router();

const {createTodo,getTodos,getTodoById,updateById}=require("../controllers/todos")

routerTodo.post("/createTodo",createTodo);
routerTodo.get("/getTodo/:id",getTodos);
routerTodo.get("/getTodoById/:id/:todoId",getTodoById);
routerTodo.post("/updateById",updateById);
module.exports=routerTodo;