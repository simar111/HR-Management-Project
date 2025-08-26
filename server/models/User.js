// /models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for the User model
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['Admin', 'HR', 'Manager', 'Employee'], // Define possible roles
      default: 'Employee', // Default role for new users
    },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// --- Mongoose Middleware ---

// Encrypt password using bcrypt before saving the document
// This is a 'pre-save' hook that runs before a user document is saved.
userSchema.pre('save', async function (next) {
  // If the password has not been modified, move to the next middleware.
  // This prevents re-hashing the password on every user update.
  if (!this.isModified('password')) {
    next();
  }

  // Generate a salt for hashing the password. 10 is the number of salt rounds.
  const salt = await bcrypt.genSalt(10);
  // Hash the password with the generated salt.
  this.password = await bcrypt.hash(this.password, salt);
});

// --- Mongoose Methods ---

// Method to compare entered password with the hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
