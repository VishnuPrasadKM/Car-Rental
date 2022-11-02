const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const key = process.env.key;
// Register Route
router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    console.log(error);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists! Login in insted" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
  } catch (error) {
    return res.status(400).json(error);
  }

  return res
    .status(201)
    .json({ message: "User registered Successfully", newUser });
});

// Login Route
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return new Error(error);
  }

  if (!existingUser) {
    return res.status(400).json({ message: "User not found. Register Please" });
  }
  const isTruePassword = bcrypt.compareSync(password, existingUser.password);
  if (!isTruePassword) {
    return res.status(400).json({ message: "Password Missmatch!" });
  }

  const token = jwt.sign({ id: existingUser._id }, key, { expiresIn: "3000s" });

  res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 10000 * 30),
    httpOnly: true,
    sameSite: "lax",
  });

  return res.status(200).json({ user: existingUser });
});

// Token verification
const verifyToken = async (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies.split("=")[1];
  if (!token) {
    return res.status(404).json({ message: "No token found" });
  }
  jwt.verify(String(token), key, (error, user) => {
    if (error) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    console.log(user.id);
    req.id = user.id;
  });
  next();
};

// Getting user by token
const getUSer = async (req, res, next) => {
  const userId = req.id;
  let user;
  try {
    user = await User.findById(userId, "-password");
  } catch (error) {
    return new Error(error);
  }
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ user });
};

router.get("/user", verifyToken, getUSer);
module.exports = router;
