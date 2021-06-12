const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  body: String,
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Types.ObjectId, ref: "User" },
});
todoSchema.methods = {
  findTitle: function () {
    return mongoose.model("ToDo", todoSchema).find({
      _id: "60bf8eef4c3b7c364432f5b8",
    });
  },
};

module.exports = todoSchema;
