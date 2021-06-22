const mongoose = require("mongoose");

const dark_messages = mongoose.Schema({
  user: String,
  channels: Map,
  timeout: Number
});

module.exports = mongoose.model("dark_messages", dark_messages);
