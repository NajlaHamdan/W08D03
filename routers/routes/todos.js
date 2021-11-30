const express=require("express");
const routerTodo=express.Router();

const {createTodo,getTodos}=require("../controllers/todos")

routerTodo.post("/createTodo",createTodo);
routerTodo.get("/getTodo/:id",getTodos);


module.exports=routerTodo;