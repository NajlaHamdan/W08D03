const mongoose = require("mongoose");

const user = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {type:String,required:true},
  todo: [
    {
      type:{type: mongoose.Schema.Types.ObjectId,
      ref:"todos"},
    },
  ],
});

module.exports = mongoose.model("user", user);
