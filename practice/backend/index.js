const express = require("express");
const app = express();
const dotenv = require("dotenv");
const userRout = require("./router/user.route");
const connectToDb = require("./utils/Db");

dotenv.config({});

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// api
app.use("/api/v1/user/",userRout);


app.listen(600,()=>{ connectToDb(); console.log('server started..')});
