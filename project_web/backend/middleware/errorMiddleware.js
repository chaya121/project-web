// backend/middleware/errorMiddleware.js
module.exports = (err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({
    error: {
      message,
      // in dev you might add stack: err.stack
    }
  });
};