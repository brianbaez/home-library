const ErrorResponse = require("../utils/ErrorResponse");

const errorHandler = (err, req, res, next) => {
  let error = {...err};

  error.message = err.message;

  if(err.code === 11000) {
    const message = "Email or username already exists";
    error = new ErrorResponse(message, 400);
  }

  if(err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  console.log(error.message);
  console.log(error.statusCode);

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error"
  });

  return;
};

module.exports = errorHandler;
