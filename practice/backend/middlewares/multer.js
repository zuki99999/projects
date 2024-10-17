const multer = require("multer");

const upload = multer({
    storage:multer.memoryStorage()
});

module.export = upload;
