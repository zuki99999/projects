
const express = require("express");
const router = express.Router();
const {isAuthenticated} = require("../middleweare/isAuthentation");

const {userController,postController, getAllUser, createComment, getAllPost, likePost, dislike, bookmarkPost, deletePost} = require("../controller/post.controller");


router.route("/post").post(postController);
router.route("/user").post(isAuthenticated,userController);
router.route("/allUsers").get(isAuthenticated,getAllUser);
router.route("/comments/:id").post(createComment);
router.route("/allPosts").get(getAllPost);
router.route("/likes/:id").get(isAuthenticated,likePost);
router.route("/dislikes/:id").post(isAuthenticated,dislike);
router.route("/bookmark/:id").post(isAuthenticated,bookmarkPost);
router.route("/delete/:id").delete(isAuthenticated,deletePost);



// router.post('/staff/create',Staff.create);
// router.post('/right/create',Right.create);
// router.post('/right/populate',Right.staffByRight);

module.exports = router;