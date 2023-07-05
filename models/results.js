const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  player1: {
    type: String,
    unique: true,
    required: true,
  },
  player2: {
    type: String,
    unique: true,
    required: true,
  },
  winner: {
    type: String,
    unique: true,
    required: true,
  },
});

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
