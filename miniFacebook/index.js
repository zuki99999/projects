const express = require("express");
const User = require("./model/user");
const app = express();
const path = require('path');
const  route  = require("./routes/routes");


app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));


app.use(route);

app.listen(3000,()=>console.log('server started'));

