const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    usertype: {
      type: String,
      enum: ["Donor", "Needy"],
      required: true
    },

    status: {
      type: Number,
      default: 1
    }
  },
  {
    versionKey: false
  }
);

const User = mongoose.model("Users", UserSchema);

module.exports = User;