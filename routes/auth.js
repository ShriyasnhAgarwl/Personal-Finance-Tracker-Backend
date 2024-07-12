const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config");
const router = express.Router();

// Signup route
router.post("/signup", async (req, res) => {
  const { name, email, phonenumber, country, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      name,
      email,
      phonenumber,
      country,
      password,
    });

    await user.save();

    const payload = { userId: user.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Signin route
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = { userId: user.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
