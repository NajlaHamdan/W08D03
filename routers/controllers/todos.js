const todoModel = require("../../db/models/todos");
const userModel = require("../../db/models/user");

const createTodo = async (req, res) => {
  try {
    const { name, id } = req.body;
    const newTodo = new todoModel({
      name,
    });
    await userModel.findById(id).then(async (result) => {
      if (result) {
        console.log(result);
        newTodo.owner = result._id;
        await result.todo.push(newTodo);
        await result.save();
        await newTodo.save();
        console.log("owner", newTodo.owner);
        console.log(result.todo);
        res.status(200).json(result.todo);
      } else {
        res.status("404").json("no user with this id");
      }
    });
  } catch (err) {
    res.status(404).json(err);
  }
};

const getTodos = (req, res) => {
  try {
    //id for the user
    const { id } = req.params;
    //find user to get his todos
    userModel
      .findById(id)
      .then(async (result) => {
        if (result) {
          console.log(result);
          // find todos for the user and save it in array todos
          const todos = await todoModel.find({ owner: id });
          if (todos.length) {
            //store todos name in array to display it in res
            // const todosName = [];
            // todos.forEach((item) => {
            //   todosName.push(item.name);
            // });
            res.status(200).json(todos);
          } else {
            res.status(200).json("no todos for this user");
          }
        } else {
          res.status("404").json("no user with this id");
        }
      })
      .catch((err) => {
        res.status("200").json(err);
      });
  } catch (err) {
    res.status("404").json(err);
  }
};
const getTodoById = (req, res) => {
  try {
    //id for the user
    const { id, todoId } = req.params;
    userModel
      .findById(id)
      .then(async (result) => {
        if (result) {
          console.log(result);
          const todo = await todoModel.findById(todoId);
          if (todo) {
            console.log(todo);
            res.status("200").json(todo.name);
          } else {
            res.status("404").json("there is no todo with this id");
          }
        } else {
          res.status("404").json("there is no user with this id");
        }
      })
      .catch((err) => {
        res.status("404").json(err);
      });
  } catch (err) {
    res.status("404").json(err);
  }
};

const updateById = async (req, res) => {
  try {
    const { name, id, todoId } = req.body;
    //find user
    await todoModel.findOne({ owner: id }).then(async (result) => {
      if (result) {
        const todo = await todoModel.findByIdAndUpdate(todoId, { name: name }); //.then(async (result) => {
        if (todo) {
          console.log(todo);
          await todo.save();
          res.status(200).json(todo);
        } else {
          res.status(200).json("there is no todo with this id");
        }
        //});
      } else {
        res.status("404").json("can not access this todo");
      }
    });
  } catch (err) {
    res.status("404").json(err);
  }
};

const deleteTodosSingleUser = async (req, res) => {
  try {
    const { name, id, todoId } = req.params;
    await userModel.findById(id).then(async (result) => {
      if (result) {
        await todoModel.find({ owner: id }).then(async (result) => {
          if (result.length) {
            await todoModel.deleteMany({ owner: id }).then((result) => {
              if (result.deletedCount != 0) {
                res.status("200").json(result);
              } else {
                res.status("404").json("already deleted");
              }
            });
          } else {
            res.status("404").json("this user does not have todos");
          }
        });
      } else {
        res.status("404").json("no user with this id");
      }
    });
  } catch (err) {
    res.status("404").json(err);
  }
};
const deleteTodo = async (req, res) => {
  try {
    const { id, todoId } = req.params;
    await userModel.findById(id).then(async (result) => {
      if (result) {
        await todoModel.find({ owner: id }).then(async (result) => {
          if (result.length) {
            await todoModel.findByIdAndDelete({ _id:todoId }).then((result) => {
              if (result) {
                res.status("200").json(result);
              } else {
                res.status("404").json("already deleted");
              }
            });
          } else {
            res.status("404").json("this user does not have todos");
          }
        });
      } else {
        res.status("404").json("no user with this id");
      }
    });
  } catch (err) {
    res.status("404").json(err);
  }
};
//for admin
const getAllTodos = async (req, res) => {
  try {
    const todos = await todoModel.find();
    if (todos.length) {
      //store todos name in array to display it in res
      const todosName = [];
      todos.forEach((item) => {
        todosName.push(item.name);
      });
      res.status("200").json(todosName);
    } else {
      res.status("404").json("no todos");
    }
  } catch (err) {
    res.status("404").json(err);
  }
};
//remove all todos for one user
const deleteTodos = async (req, res) => {
  try {
    await todoModel.deleteMany({ owner: id }).then((result) => {
      if (result.deletedCount != 0) {
        res.status("200").json(result);
      } else {
        res.status("404").json("already deleted");
      }
    });
  } catch (err) {
    res.status("404").json(err);
  }
};
module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateById,
  getAllTodos,
  deleteTodo,
  deleteTodos,
  deleteTodosSingleUser,
};
