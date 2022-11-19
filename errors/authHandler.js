const jwt = require("jsonwebtoken");
const { CustomApiError, createCustomError } = require("./CustomApiError");
const authHandler = async (req, res, next) => {
    //remember to pass authorisation in header not query in end point and postman
    var authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(createCustomError("Unauthorized", 401));
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({
            success: true,
            welcome: `Welcome ${decoded.username}`,
            data: `Your lucky number is ${Math.floor(Math.random() * 100)}`,
        });
    } catch (error) {
        return next(createCustomError("Unauthorized user", 401));
    }

    next();
};

module.exports = { authHandler }; //add to router
