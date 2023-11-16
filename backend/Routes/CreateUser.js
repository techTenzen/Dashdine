const express = require("express");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/User");

// Replace this with your actual secret key
const jwtSecret = "onepieceonepieceonepieceonepieceonepieceonepieceonepieceonepiece";

// Validation middleware for creating a user
const createUserValidation = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("name")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Name should be at least 2 characters long"),
  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long"),
  body("location").isString(),
];

// Validation middleware for logging in a user
const loginValidation = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long"),
];

// Create a new user
router.post("/createuser", createUserValidation, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Return validation errors as JSON response
    return res.status(400).json({ errors: errors.array() });
  }

  const salt = await bcrypt.genSalt(10);
  let secPassword = await bcrypt.hash(req.body.password, salt);

  try {
    // Create a new user document
    const newUser = new User({
      name: req.body.name,
      password: secPassword,
      email: req.body.email,
      location: req.body.location || "Unknown",
    });

    // Save the user document to the "users" collection
    await newUser.save();

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating user" });
  }
});

// Log in a user and generate a JWT token
router.post("/loginuser", loginValidation, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Return validation errors as JSON response
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ errors: "User not found" });
    }

    const pwdCompare = await bcrypt.compare(req.body.password, user.password);

    // Check if the provided password matches the stored password
    if (pwdCompare) {
      const data = { userId: user.id, userEmail: user.email }; // Include user data in the token
      const authToken = jwt.sign(data, jwtSecret); // Sign the token

      return res.json({
        success: true,
        message: "Login successful",
        authToken,
      });
    } else {
      return res.status(400).json({ errors: "Incorrect password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error logging in" });
  }
});

module.exports = router;
