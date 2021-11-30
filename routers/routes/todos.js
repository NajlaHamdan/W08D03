const express=require("express");
const routerTodo=express.Router();

const {createTodo,getTodos}=require("../controllers/todos")

routerTodo.post("/createRole",createTodo);
routerTodo.get("/getRole",getTodos);


module.exports=routerTodo;