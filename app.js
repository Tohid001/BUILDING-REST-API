const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./Routhandler/todoHandler");
//express app initialization
const app = express();
app.use(express.json());

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
// mongoose
//   .connect("mongodb://localhost/Todos", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connection with database is successfull.");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//application routes
app.use("/todo", todoHandler);

//opening server
app.listen(3000, () => {
  console.log("I am listening");
});
