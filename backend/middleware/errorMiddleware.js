export const errorMiddlware = (err, req, res, next) => {
  console.log(err);

  const status = res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });

  return res.status(stauts);
};
