const todoModel = require("../../db/models/todos");
const userModel = require("../../db/models/user");
const createTodo = async (req, res) => {
  try {
    const { name, id } = req.body;
    const newTodo = new todoModel({
      name,
    });
    const user = await userModel.findById(id).then(async(result) => {
      if (result) {
        console.log(result);
        newTodo.owner = result._id;
        await result.todo.push(newTodo);
        await result.save();
        await newTodo.save();
        console.log("owner",newTodo.owner);
        console.log(result.todo);
        res.status(200).json(result.todo);
      }
    });
  } catch (err) {
    res.status(404).json(err);
  }
};

const getTodos = (req, res) => {
  todoModel
    .find({})
    .then((result) => res.status("200").json(result))
    .catch((err) => res.status("200").json(err));
};

module.exports = { createTodo, getTodos };
