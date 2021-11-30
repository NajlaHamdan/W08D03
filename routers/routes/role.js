const express=require("express");
const routerRole=express.Router();

const {createRole,getRole}=require("./../controllers/role")

routerRole.post("/createRole",createRole);
routerRole.get("/getRole",getRole);


module.exports=routerRole;