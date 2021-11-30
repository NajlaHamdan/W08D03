const mongoose = require("mongoose");

const todos = new mongoose.Schema({
  name: { type: String, required: true },
  isDelete: { type: Boolean, default: false },
  owner:  { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});
module.exports = mongoose.model("todos", todos);
