module.exports = (err, req, res, next) => {
  res.json({
    code: err.code,
    messgae: err.message,
    stackTrace: err.stack
  });
};
