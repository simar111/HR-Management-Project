// /routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser , loginUser } = require('../controllers/authController');

// --- Route Definitions ---

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);
router.post("/login",loginUser)



// Export the router to be used in the main server file
module.exports = router;