const v1 = require("cloudinary");
const dotEnv = require("dotenv");
dotEnv.config({});


v1.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret:process.env.api_secret
})

module.exports = { v1 };