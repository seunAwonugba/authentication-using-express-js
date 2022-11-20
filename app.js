const express = require("express");
const app = express();
const port = 3000;
const host = "localhost";
const { router } = require("./router/router");
require("express-async-errors");
const { errorHandler } = require("./errors/errorHandler");
require("dotenv").config();
const { StatusCodes } = require("http-status-codes");

app.use(express.json());
app.use(express.static("./public"));
app.use("/api/v1", router);

app.use("*", (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        data: StatusCodes.NOT_FOUND,
    });
});

app.use(errorHandler);

const startServer = () => {
    try {
        app.listen(port, host, () => {
            console.log(`server is listening on http://${host}:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();
