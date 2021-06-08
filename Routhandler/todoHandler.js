const express = require("express");
const mongoose = require("mongoose");
const todoSchema = require("../Schemas/todoSchema");
const ToDo = new mongoose.model("Todo", todoSchema);
//Router initialization
const todoHandler = express.Router();

//get all/multiple todos
todoHandler.get("/", async (req, res, next) => {
  try {
    const data = await ToDo.find({ author: "Tohid", title: true }).select({
      date: 0,
    });
    res.status(200).json({ informations: data });
    console.log("todo was inserted successfully!");
  } catch (error) {
    console.log(`${error}`);
    res.status(500).json({ message: `There was an error!${error}` });
  }
});

//get a todo
todoHandler.get("/:id", async (req, res, next) => {
  try {
    const data = await ToDo.findById({ _id: req.params.id }).select({
      date: 0,
    });
    res.status(200).json({ informations: data });
    console.log("todo was inserted successfully!");
  } catch (error) {
    console.log(`${error}`);
    res.status(500).json({ message: `There was an error!${error}` });
  }
});

//post a todo
todoHandler.post("/", async (req, res, next) => {
  try {
    const newToDo = new ToDo(req.body);
    await newToDo.save();
    res.status(200).json({ message: "todo was inserted successfully!" });
    console.log("todo was inserted successfully!");
  } catch (error) {
    console.log(`${error}`);
    res.status(500).json({ message: `There was an error!${error}` });
  }
});

//post multiple todos
todoHandler.post("/all", async (req, res, next) => {
  try {
    await ToDo.insertMany(req.body);
    res.status(200).json({ message: "todos were inserted successfully!" });
    console.log("todos were added successfully!");
  } catch (error) {
    console.log(`${error}`);
    res.status(500).json({ message: `There was an error!${error}` });
  }
});

//update a todo
todoHandler.put("/:id", async (req, res, next) => {
  try {
    const data = await ToDo.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { body: "Updated successfully!" } },
      { useFindAndModify: false, new: true }
    );
    console.log("todo was inserted successfully!");
    console.log(data);
    res.status(200).json({ message: "todo was updated successfully!" });
  } catch (error) {
    console.log(`${error}`);
    res.status(500).json({ message: `There was an error!${error}` });
  }
  //   new Promise((resolve, reject) => {
  //     const data = ToDo.findByIdAndUpdate(
  //       { _id: req.params.id },
  //       { $set: { body: "Used promise!" } },
  //       { useFindAndModify: false }
  //     );
  //     if (data) {
  //       resolve(data);
  //     } else {
  //       reject("error");
  //     }
  //   })
  //     .then((data) => {
  //       console.log("todo was inserted successfully!");
  //       console.log(data);
  //       res.status(200).json({ message: "todo was updated successfully!" });
  //     })
  //     .catch((error) => {
  //       console.log(`${error}`);
  //       res.status(500).json({ message: `There was an error!${error}` });
  //     });
});

//delete a todo
todoHandler.delete("/:user", async (req, res, next) => {
  try {
    await ToDo.deleteMany({
      author: req.params.user,
    });
    res.status(200).json({ message: "todo was deleted successfully!" });
    console.log("todo was deleted successfully!");
  } catch (error) {
    console.log(`${error}`);
    res.status(500).json({ message: `There was an error!${error}` });
  }
});
console.log("hello");

module.exports = todoHandler;
