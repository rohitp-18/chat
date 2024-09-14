module.exports = (err, req, res, next) => {
  let message = err.message;
  let status = err.statusCode || 500;

  if (err.code === 11000) {
    message = "email already exist";
    status = 403;
  }

  if (message === "invalid signature" || message === "jwt malformed") {
    res.status(status).clearCookie("token").json({
      success: false,
      message: "Internal Error",
      stack: err.stack,
    });
    return;
  }
  res.status(status).json({
    message,
    stackTrace: err.stack,
  });
};
