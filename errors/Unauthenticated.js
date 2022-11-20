const { CustomApiError, createCustomError } = require("./CustomApiError");
const { StatusCodes } = require("http-status-codes");

class Unauthenticated extends CustomApiError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = { Unauthenticated };
