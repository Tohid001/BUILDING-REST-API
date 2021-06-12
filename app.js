const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./Routhandler/todoHandler");
const userHandler = require("./Routhandler/userHandler");
const defaultError = require("./Error handling/defaultError");
const dotenv = require("dotenv");
//express app initialization
const app = express();

//database connection
const db = async () => {
  try {
    await mongoose.connect("mongodb://localhost/Todos", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection with database is successfull.");
  } catch (error) {
    console.log(error);
  }
};
db();

//application routes
dotenv.config();
app.use(express.json());
app.use("/todo", todoHandler);
app.use("/user", userHandler);

//error handling
app.use(defaultError);
//opening server
app.listen(3000, () => {
  console.log("I am listening");
});
