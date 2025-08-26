// /config/db.js

const mongoose = require('mongoose');

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 * The function uses the MONGO_URI from the environment variables.
 */
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB cluster.
    // The connection string should be stored in an environment variable for security.
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // These options are recommended by Mongoose to avoid deprecation warnings.
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // If the connection is successful, log a confirmation message.
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If an error occurs during connection, log the error message and exit the process.
    console.error(`Error: ${error.message}`);
    // Exit the Node.js process with a failure code (1).
    process.exit(1);
  }
};

// Export the connectDB function to be used in the main server file.
module.exports = connectDB;