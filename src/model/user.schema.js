const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  image: {},
});

module.exports = mongoose.model("User", userSchema);
