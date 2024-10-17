const  mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/miniFacebook')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String
    },
    image:{
        type:String
    }
});

module.exports = mongoose.model("User",userSchema);
