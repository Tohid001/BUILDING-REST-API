// const express = require("express");
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  body: String,
  date: { type: Date, default: Date.now },
});

module.exports = todoSchema;
