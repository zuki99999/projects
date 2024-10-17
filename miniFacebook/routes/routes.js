const express = require('express');
const { read, update, deleteUser, edit, create, home } = require('../controller');

const router = express.Router();


router.route("/read").get(read);
router.route('/update').post(update);
router.route('/delete').get(deleteUser);
router.route('/edit').post(edit);
router.route('/create').post(create);
router.route('/').get(home);

module.exports = router;