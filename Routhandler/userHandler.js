const express = require("express");
const userHandler = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const checkLogIn = require("../Middlewares/Checklogin");
const todoSchema = require("../Schemas/todoSchema");
const userSchema = require("../Schemas/userSchema");
const checkLogin = require("../Middlewares/Checklogin");
const ToDo = new mongoose.model("Todo", todoSchema);
const User = new mongoose.model("User", userSchema);

//SIGNUP
userHandler.post("/signup", async (req, res, next) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: hashPassword,
      country: req.body.country,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
    });
    await newUser.save();

    res.status(200).json({ message: "Sign up is successful" });
    console.log("Sign up is successful");
  } catch (error) {
    console.log(`${error}`);
    res.status(500).json({ message: `Sign up failed! ${error}` });
    next(error);
  }
});

//LOGIN
userHandler.post("/login", async (req, res) => {
  try {
    const user = await User.find({ userName: req.body.userName });
    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPassword) {
        const token = jwt.sign(
          { userName: user[0].userName, userId: user[0]._id },
          process.env.JWT_SECRET,
          { expiresIn: "10h" }
        );
        res.status(200).json({
          access_token: token,
          message: `Welcome ${user[0].userName}`,
        });
      } else {
        res.status(401).json({ message: "Wrong password!" });
      }
    } else {
      res.status(401).json({ message: "username isn't valid!" });
    }
  } catch (error) {
    console.log(`${error}`);
    res.status(500).json({
      message: `Oops! something went wrong! Please try again. ${error}`,
    });
  }
});

//get all users
userHandler.get("/all", checkLogin, async (req, res, next) => {
  try {
    const data = await User.find({ _id: req.userId }).populate("todos");
    res.status(200).json({ informations: data });
    console.log(`Welcome to your todo Mr. ${data.firstName} ${data.lastName}`);
  } catch (error) {
    console.log(`${error}`);
    res.status(500).json({ message: `There was an error!${error}` });
  }
});

// //get a todo
// todoHandler.get("/:id", async (req, res, next) => {
//   try {
//     const data = await ToDo.findById({ _id: req.params.id }).select({
//       date: 0,
//     });
//     res.status(200).json({ informations: data });
//     console.log("todo was inserted successfully!");
//   } catch (error) {
//     console.log(`${error}`);
//     res.status(500).json({ message: `There was an error!${error}` });
//   }
// });

// //post a todo
// todoHandler.post("/", async (req, res, next) => {
//   try {
//     const newToDo = new ToDo(req.body);
//     await newToDo.save();
//     res.status(200).json({ message: "todo was inserted successfully!" });
//     console.log("todo was inserted successfully!");
//   } catch (error) {
//     console.log(`${error}`);
//     res.status(500).json({ message: `There was an error!${error}` });
//   }
// });

// //post multiple todos
// todoHandler.post("/all", async (req, res, next) => {
//   try {
//     await ToDo.insertMany(req.body);
//     res.status(200).json({ message: "todos were inserted successfully!" });
//     console.log("todos were added successfully!");
//   } catch (error) {
//     console.log(`${error}`);
//     res.status(500).json({ message: `There was an error!${error}` });
//   }
// });

// //update a todo
// todoHandler.put("/:id", async (req, res, next) => {
//   try {
//     const data = await ToDo.findByIdAndUpdate(
//       { _id: req.params.id },
//       { $set: { body: "Updated successfully!" } },
//       { useFindAndModify: false, new: true }
//     );
//     console.log("todo was inserted successfully!");
//     console.log(data);
//     res.status(200).json({ message: "todo was updated successfully!" });
//   } catch (error) {
//     console.log(`${error}`);
//     res.status(500).json({ message: `There was an error!${error}` });
//   }
//   //   new Promise((resolve, reject) => {
//   //     const data = ToDo.findByIdAndUpdate(
//   //       { _id: req.params.id },
//   //       { $set: { body: "Used promise!" } },
//   //       { useFindAndModify: false }
//   //     );
//   //     if (data) {
//   //       resolve(data);
//   //     } else {
//   //       reject("error");
//   //     }
//   //   })
//   //     .then((data) => {
//   //       console.log("todo was inserted successfully!");
//   //       console.log(data);
//   //       res.status(200).json({ message: "todo was updated successfully!" });
//   //     })
//   //     .catch((error) => {
//   //       console.log(`${error}`);
//   //       res.status(500).json({ message: `There was an error!${error}` });
//   //     });
// });

// //delete a todo
// todoHandler.delete("/:user", async (req, res, next) => {
//   try {
//     await ToDo.deleteMany({
//       author: req.params.user,
//     });
//     res.status(200).json({ message: "todo was deleted successfully!" });
//     console.log("todo was deleted successfully!");
//   } catch (error) {
//     console.log(`${error}`);
//     res.status(500).json({ message: `There was an error!${error}` });
//   }
// });

module.exports = userHandler;
