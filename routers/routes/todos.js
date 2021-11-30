const express=require("express");
const routerTodo=express.Router();

const {createTodo,getTodos}=require("../controllers/todos")

routerTodo.post("/createTodo",createTodo);
routerTodo.get("/getTodo",getTodos);


module.exports=routerTodo;