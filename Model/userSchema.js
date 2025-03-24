const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    }
  },
  { timestamps: true } 
);

const Users = mongoose.model("users", userSchema);
module.exports = Users;
