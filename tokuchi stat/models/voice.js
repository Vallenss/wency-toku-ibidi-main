const mongoose = require("mongoose");

const dark_voiceStat = mongoose.Schema({
  user: String,
  channels: Map,
  state: String,
  start: Number
});

module.exports = mongoose.model("dark_voiceStat", dark_voiceStat);
