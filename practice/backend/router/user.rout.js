const express = require("express");
const router = express.Router();
const {register,login,logout,getProfile,editProfile} = require("../controller/user.controller");



router.route("/login").post(login);