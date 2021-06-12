const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
  dateOfBirth: { type: Date, required: false },
  gender: { type: String, required: true },
  todos: [{ type: mongoose.Types.ObjectId, ref: "Todo" }],
});

module.exports = userSchema;
