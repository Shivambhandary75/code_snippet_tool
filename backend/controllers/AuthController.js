//User Controller

const User = require("../models/userModel");
const { createSecretToken } = require("../utils/SecretTocken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ email, password, username, createdAt });

    const token = createSecretToken(user._id);

    // Set cookie (optional, if you want to use cookies)
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    // Send token in response
    res.status(201).json({
      message: "User signed up successfully",
      success: true,
      user,
      token, // <-- Add token here
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const token = createSecretToken(user._id);

    // Set cookie (optional)
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    // Send token in response
    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      token, // <-- Add token here
      userId: user._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
