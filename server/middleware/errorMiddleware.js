/**
 * Custom error handling middleware for Express.
 * This middleware catches all errors that occur in the application,
 * logs them, and sends a standardized JSON error response to the client.
 */
const errorHandler = (err, req, res, next) => {
  // Determine the status code. If the error object has a statusCode, use it.
  // Otherwise, default to 500 (Internal Server Error).
  const statusCode = res.statusCode ? res.statusCode : 500;

  // Set the HTTP status code for the response.
  res.status(statusCode);

  // Send a JSON response with the error message.
  // In a production environment, you might want to send a more generic message
  // and not expose the internal error stack.
  res.json({
    message: err.message,
    // Provide the error stack only in the development environment for debugging purposes.
    // In production, the stack should not be exposed to the client for security reasons.
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

/**
 * Middleware to handle 404 Not Found errors.
 * This should be placed after all other routes, just before the general error handler.
 * If no route matches the request, this middleware will be triggered.
 */
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    // Pass the error to the next middleware (our general errorHandler).
    next(error);
}


// Make sure this line is exactly as follows.
// It exports an object containing both middleware functions.
module.exports = {
  errorHandler,
  notFound
};
