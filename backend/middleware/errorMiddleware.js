// Handles requests to unknown routes
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // pass to errorMiddleware
};

// Global error handler — must have 4 params for Express to recognize it as error middleware
export const errorMiddleware = (err, req, res, next) => {
  // If status is still 200 (no error code was set), default to 500
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message,
    // Only show the stack trace in development, hide it in production
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
