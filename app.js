const express = require("express");
const app = express();
const port = 3000;
const host = "localhost";
const { router } = require("./router/router");
require("express-async-errors");
const { errorHandler } = require("./errors/errorHandler");
require("dotenv").config();

app.use(express.json());
app.use(express.static("./public"));
app.use("/api/v1", router);

app.use("*", (req, res) => {
    res.status(200).json({
        success: false,
        data: "Resource not found",
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
