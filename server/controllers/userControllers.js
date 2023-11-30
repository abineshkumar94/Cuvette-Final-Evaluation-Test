const User = require("../model/user.js");
const cookieToken = require("../utils/cookieToken.js");

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    console.log(username, password);

    if (!username || !password) {
      return next(new Error("Username and password are required"));
    }

    const isUserNameAlreadyPresent = await User.findOne({ username });

    if (isUserNameAlreadyPresent) {
      return res.status(409).json({
        message: "Username is already registered",
      });
    }

    const user = await User.create({
      username,
      password,
    });

    cookieToken(user, res);
  } catch (error) {
    console.log(error);
  }
};

exports.logIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(new Error("Username and password are required"));
    }

    console.log(username, password);

    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      return res.status(409).json({
        message: "User is not registered",
      });
    }

    const isPasswordCorrect = await user.isValidatedPassword(password);

    if (!isPasswordCorrect)
      return next(new Error("You are password is wrong", 400));

    cookieToken(user, res);
  } catch (error) {
    console.log(error);
  }
};

exports.logOut = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logout Success",
    });
  } catch (error) {}
};

exports.getUserdetails = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const individualUserDetails = await User.findById(req.params.id);

    if (!individualUserDetails) {
      return res.status(400).json({
        success: false,
        message: "There are no stories avaiable ",
      });
    }

    res.status(200).json({
      success: true,
      user: individualUserDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
