const mongoose = require("mongoose");

const todos = new mongoose.Schema({
  todo: [
    {
      name: { type: String },
      isDelete:{type:Boolean,default:false},
    },
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("todos", todos);
