const express=require("express");
const routerUser=express.Router();

const {register,login}=require("./../controllers/user")

routerUser.post("/createUser",register);
routerUser.post("/login",login);


module.exports=routerUser;