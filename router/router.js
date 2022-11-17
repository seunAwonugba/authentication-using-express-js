const express = require("express");
const router = express.Router();
const { login, dashboard } = require("../controllers/controller");
const { authHandler } = require("../errors/authHandler");

router.post("/login", login);
router.get("/dashboard", authHandler, dashboard);

module.exports = { router };
