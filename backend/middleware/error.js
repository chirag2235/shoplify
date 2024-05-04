const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
    console.error(err.message); // Log the error object
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Send JSON response
    res.status(err.statusCode).json({
        success: false,
        error: err.message
    });
};