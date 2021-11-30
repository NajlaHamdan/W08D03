const mongoose = require("mongoose");

const role = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  permissions: {type:Array,required:true},
  role: [{ type: mongoose.Schema.Types.ObjectId ,ref:"role"}]
});

module.exports = mongoose.model("role", role);
