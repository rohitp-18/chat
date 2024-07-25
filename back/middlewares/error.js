module.exports = (err, req, res, next) => {
  const message = err.message;
  const status = err.statusCode;

  if (message === "invalid signature" || message === "jwt malformed") {
    res.status(status).clearCookie("token").json({
      success: false,
      message: "Internal Error",
      stack: err.stack,
    });
  }

  res.status(status).json({
    message,
    stackTrace: err.stack,
  });
};
