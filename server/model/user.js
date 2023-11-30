const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide your name"],
    maxlength: [40, "Name should be of 40 characters"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "PLease provide your password"],
    minlength: [6, "password should be of 6 characters"],
    select: false,
  },
});

// * Encrypt Password before save == Pre Hooks
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  return next();
});

// * Checking the password is correct
userSchema.methods.isValidatedPassword = async function (userSendPassword) {
  return await bcrypt.compare(userSendPassword, this.password);
};

// * Creating and returning an JWT  magazine to keep it loaded token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRY,
  });
};

module.exports = mongoose.model("User", userSchema);
