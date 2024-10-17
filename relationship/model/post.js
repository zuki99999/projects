const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    caption:{
        type:String,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,ref:'User',
        type:String,
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,ref:'User',
        type:String,
    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,ref:'Comment',
        type:String,
    }],
});

module.exports = mongoose.model("Post",postSchema);