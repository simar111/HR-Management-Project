// /controllers/authController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');

// --- Utility Function ---

/**
 * Generates a JSON Web Token (JWT) for a given user ID.
 * @param {string} id - The user ID to be included in the token payload.
 * @returns {string} The generated JWT.
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // The token will expire in 30 days
  });
};


// --- Controller Functions ---

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // --- Basic Validation ---
    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please provide name, email, and password');
    }

    // Check if a user with the given email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User with this email already exists');
    }

    // Create a new user in the database
    const user = await User.create({
      name,
      email,
      password,
      role, // Role can be optionally provided
    });

    // If the user was created successfully, send back user info and a token
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    // Pass any errors to the global error handling middleware
    next(error);
  }
};
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // --- Basic Validation ---
    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide an email and password');
    }

    // Check for user by email
    const user = await User.findOne({ email });

    // Check if user exists and if the password matches using the method from the User model
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401); // Unauthorized
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    // Pass any errors to the global error handling middleware
    next(error);
  }
};


// Export the controller function
module.exports = {
  registerUser,
  loginUser
};
