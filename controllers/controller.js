const {
    CustomApiError,
    createCustomError,
} = require("../errors/CustomApiError");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return next(
            createCustomError("Username or password cannot be empty", 404)
        );
    }

    //normally the sign method contains 3 parameters
    // 1. payload which is an obj and it normally contains userId, username not password
    // 2. secrete defined in .env, for production project use more complex secrete key value

    const token = jwt.sign(
        {
            id: new Date().getDate(),
            username: username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "30d",
        }
    );

    res.status(200).json({
        success: true,
        data: "user created",
        token: token,
    });
};

const dashboard = async (req, res, next) => {
    //remember to pass authorisation in header not query in end point and postman
    var authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(createCustomError("Unauthorized", 401));
    }

    const token = authHeader.split(" ")[1];
    //decode ur token
    try {
        const decoded = jwt.decode(token, process.env.JWT_SECRET);
        res.status(200).json({
            success: true,
            welcome: `Welcome ${decoded.username}`,
            data: `Your lucky number is ${Math.floor(Math.random() * 100)}`,
        });
    } catch (error) {
        return next(createCustomError("Unauthorized user", 401));
    }
};

module.exports = { login, dashboard };
