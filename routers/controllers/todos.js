const todoModel = require("../../db/models/todos");
const userModel = require("../../db/models/user");
const createTodo = async (req, res) => {
 try{
  const { name,email, password } = req.body;
  const todo = new todoModel({
    name,
  });
  const user = new userModel({
    email,
    password,
  });
  todo.owner=user._id
  user.todo.push(todo)
  await user.save();
  await todo.save();
  res.status(200).json("done")
 }catch(err){
  res.status(200).json(err)
 }
};

const getTodos = (req, res) => {
  todoModel
    .find({})
    .then((result) => res.status("200").json(result))
    .catch((err) => res.status("200").json(err));
};

module.exports = { createTodo, getTodos };
