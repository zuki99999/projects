const Post = require("../model/post");
const User = require("../model/user");
const Comment = require("../model/comments");


const userController = async(req,res)=>{
    try{
        const name = req.body.username;
        const email = req.body.email;
        if(!email||!name){
            return res.status(401).json({
                message:"no user or post"
            });
        }
        const user = await User.create({
            username: name,
            email:email,
        });

        return res.status(200).json({
            user
        })
    }catch(err){
        console.log(err);
    }
}

const postController = async(req,res)=>{
    try {
        const {caption,author,likes} = req.body;

        if(!caption||!author||!likes){
            return res.status(401).json({
                message:"missing something"
            });
        }

        const user = await User.findById(author);//post halne user

        const newPost = await Post.create({
            caption:caption,
            likes:likes,
            author:user._id
        });

        await user.posts.push(newPost._id);
        await user.save();

        return res.status(200).json({
            message:"post created",
            newPost
        });

    }catch(error){
        console.log(error);
    }
}

const getAllUser = async(req,res)=>{
    try {
        const {username} = req.body;

        const user = await User.findOne({username:username});
        const populatedUser = await user.populate('posts');

        if(!user){
            return res.status(401).json({
                message:"no susch user"
            });
        }

        return res.status(200).json({
            user:populatedUser
        });

    }catch(error){
        console.log(error);
    }
} 

const createComment = async(req,res)=>{

    try{

        const {text , commentAuthor} = req.body;
        const postId =req.params.id;
        console.log(">>",commentAuthor);

        // conditions---

        const comment = await Comment.create({
            text,
            author:commentAuthor,
            post:postId
        });


        const post = await Post.findById(postId);
        post.comments.push(comment._id);
        await post.save();

        return res.status(200).json({
            post
        });
        
        

    // const {text,id} = req.body;
    // console.log(">>>",req.body);

    // const post = await Post.findById(id);
    // const author = await req.params.id;
    // console.log(post);


    // const newComment = await Comment.create({
    //     text:text,
    //     author:author._id,
    //     post:post._id
    // })

    // //  post.comments.push(newComment);
    // //  await post.save();

    // const posts = await Post.find()
    // .populate({path:'author',select:'username , profilePicture'}).
    // populate({
    //     path:'comments',
    //     populate:{
    //         path:'author',
    //         select:'username,profilePicture'
    //     }
    // });

    // return res.status(200).json({
    //   newComment,
    //   posts
    // });

}catch(err){
    console.log(err);
}

}


const getAllPost = async(req,res)=>{
    const posts = await Post.find()
    .populate({path:'author',select:'username'}).
    populate({
        path:'comments',
        populate:{
            path:'author',
            select:'username'
        }
    });

    return res.status(200).json({
        posts
    })
}

const likePost = async(req,res)=>{
    try {

        const post = await Post.findById(req.params.id);
        console.log(post);
        if(!post){
            return res.status(400).json({
                message:"post not found",
            });
        }
        const boolen = post.likes.includes(req.id);

        if(boolen){
            return res.status(400).json({
                message:"alreayy liked"
            });
        }

        post.likes.push(req.body.id);
        await post.save();

        const result = await post.populate({
            path:"likes",
            select:"username"
        });

        return res.status(200).json({
            result
        });
        
    } catch (err){
        console.error(err);
    }
}

const dislike = async(req,res)=>{
    try {

        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(400).json({
                message:"post not found",
            });
        }
        const boolen = post.likes.includes(req.body.id);

        if(boolen){
            post.likes.pop(req.body.id);
            await post.save();
        }

        const result = await post.populate({
            path:"likes",
            select:"username"
        });

        return res.status(200).json({
            result
        });
        
    } catch (err){
        console.error(err);
    }

}

const bookmarkPost = async (req,res)=>{
    try{
        const postId = req.params.id;
        const userId = req.body.id;

        if(!userId||!postId){
            return res.status(400).json({
                message:'invalid sinax'
            });
        }

        const user = await User.findById(userId);
        await user.bookmark.push(postId);
        const post = await user.save();

        return res.status(200).json({
            post,
        });

    }catch(err){
        console.error(err);
    }
}

const deletePost = async(req,res)=>{
    const postId = req.params.id;

    const post = Post.findById(postId);
    
    if(!post){
        return res.status(400).json({
            message:"post not found",
        })
    }

    Post.findByIdAndDelete(postId);
    return res.status(400).json({
        message:"post deleted"
    })

}


module.exports = {postController,userController,getAllUser,createComment,getAllPost,likePost,dislike,bookmarkPost,deletePost};
