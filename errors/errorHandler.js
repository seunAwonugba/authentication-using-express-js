const { CustomApiError } = require("./CustomApiError");
const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomApiError) {
        return res.status(err.statusCode).json({
            success: false,
            data: err.message,
        });
    }
    return res.status(err.statusCode).json({
        success: false,
        data: err,
    });
};

module.exports = { errorHandler };
