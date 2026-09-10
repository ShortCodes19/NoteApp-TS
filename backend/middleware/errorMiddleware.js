const errorMiddleware = (err, req, res, next) => {
  console.log("Error: ", err.stack);
  const status = res.statusCode !== 200 ? res.statusCode : 500;

  return res.status(status).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

const notFound = (req, res, next) => {
  return res.status(404).json({
    success: false,
    message: `Not Found - ${req.originalUrl}`,
  });
};

export { errorMiddleware, notFound };
