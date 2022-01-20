const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Name Required"],
    trim: true,
    maxlength: [20, "let thy name be within the 20 chars"],
  },
  isDone: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("task", taskSchema);
