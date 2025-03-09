const admin = require("../config/firebase");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Create user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name
    });

    // Save user to MongoDB
    const newUser = new User({ firebaseUID: userRecord.uid, email, name });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { token } = req.body; // Token from Firebase frontend auth

  try {
    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const user = await User.findOne({ firebaseUID: decodedToken.uid });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Generate JWT for session authentication
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ message: "Login successful", jwtToken, user });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
