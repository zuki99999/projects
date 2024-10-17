const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/relationship").then(
    console.log("db connectrd...")
);

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(require("./routes/routes"));
app.use(require("./routes/user.route"));

app.listen(3000,()=>console.log("server started.."));