const jwt = require("jsonwebtoken");
const { CustomApiError, createCustomError } = require("./CustomApiError");
const { Unauthenticated } = require("./Unauthenticated");
const authHandler = async (req, res, next) => {
    //remember to pass authorisation in header not query in end point and postman
    var authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new Unauthenticated("Unauthorized"));
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, username } = decoded;
        req.user = { id, username };
        next();
    } catch (error) {
        return next(new Unauthenticated("Unauthorized user"));
    }
};

module.exports = { authHandler }; //add to router
