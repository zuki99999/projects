
const express = require("express");
const router = express.Router();

const { login , register, logout } = require("../controller/user.controller");

 
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);



module.exports = router;