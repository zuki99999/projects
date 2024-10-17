const express = require("express");
const router = express.Router();
const {register,login,logout,getProfile,editProfile,getSuggestedUsers,followOrUnfollow} = require('../controller/user.controller');
const { default: isAuthenticated } = require("../../../instagram/Backend/middleware/isAuthenticated");
const { default: upload } = require("../../../instagram/Backend/middleware/multer");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/logout").get(logout);
router.route("/:id/profile").get(isAuthenticated,getProfile);
router.route("profile/edit").post(isAuthenticated,upload.single("profilepicture"),editProfile);
router.route("/suggested").get(isAuthenticated,getSuggestedUsers);
router.route("/followOrUnfollow/:id").get(isAuthenticated,followOrUnfollow);


module.exports = router;