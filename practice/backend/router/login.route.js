const express = require("express");
const router = express.Router();
const {login} = require("../controller/user.controller")


router.route("/api/v1/login").get(login);
router.route("/api/v1/login").post(login);
router.route("/api/v1/login").delete(login);


module.exports = router;
