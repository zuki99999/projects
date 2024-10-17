const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String,
        required:true,
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,ref:'Post'
    }],
    bookmark:[{
        type:mongoose.Schema.Types.ObjectId,ref:'Post'
    }]
});

module.exports = mongoose.model("User",UserSchema);
