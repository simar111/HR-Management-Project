// Import necessary packages
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
// Import custom modules
dotenv.config();
const connectDB = require('./config/db'); // Assuming you have a db connection file
const { errorHandler, notFound } = require('./middleware/errorMiddleware');



// Establish a connection to the MongoDB database
connectDB();


const app = express();

// --- Middleware Setup ---

// Enable Cross-Origin Resource Sharing (CORS) to allow requests from the frontend
app.use(cors());

app.use(express.json());


app.get('/', (req, res) => {
  res.send('API is running successfully...');
});

app.use('/api/auth', require('./routes/authRoutes'));


app.use(notFound);

app.use(errorHandler);



const PORT = process.env.PORT || 5000;

// Start the server and listen for incoming connections.
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
