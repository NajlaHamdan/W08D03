const todoModel = require("../../db/models/todos");
const createTodo = (req, res) => {
  const { name } = req.body;
  const newTodo = new todoModel({
    name,
  });
  newTodo
    .save()
    .then((result) => {
      res.status("201").json(result);
    })
    .catch((err) => {
      res.status("404").json(err);
    });
};
const getTodos = (req, res) => {
  todoModel
    .find({})
    .then((result) => res.status("200").json(result))
    .catch((err) => res.status("200").json(err));
};

module.exports = { createTodo, getTodos };
