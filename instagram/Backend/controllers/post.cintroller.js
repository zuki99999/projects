import sharp from "sharp"
import cloudinary from "../utils/cloudanary.js";
import {Post} from "../model/post.model.js";
import { User } from "../model/user.model.js";
import { Comment } from "../model/comment.model.js";

export const addNewPost = async(req,res)=>{
    try{
        const {caption} = req.body;
        const image = req.file;
        const authorId = req.id;//authentation

        if(!image)return res.status(401).json({message:"image required"});

        //image upload
        const optimizedImageBuffer = await sharp(image.buffer)
        .resize({width:800,height:800,fit:"inside"})
        .toFormat("jpeg",{quality:800})
        .toBuffer();

        //buffer uri
        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString("base64")}`;
        const cloudResponse = await cloudinary.uploader.upload(fileUri);
        const post = await Post.create({
            caption,
            image:cloudResponse.secure_url,
            author:authorId
        });
        const user = await User.findById(authorId);

        if(user){
            user.post.push(post._id);
            await user.save();
        }

        await post.populate({path:"author",select:'-password'});

        return res.status(200).json({
            message:'new post added',
            post,
            success:true,
        });

    }catch(err){
        console.log(err);
    }
}


export const getAllPost = async(_,res)=>{
    try{
    const posts = await Post.find().short({createdAt})
    .populate({path:'author',select:'username , profilePicture'}).
    populate({
        path:'comments',
        short:{createdAt:-1},
        populate:{
            path:'author',
            select:'username,profilePicture'
        }
    });
    
    return res.json(200).json({
        posts,
        success:true,
    });

    }catch(err){
        console.log(err);
    }
}


export const getUserPost = async (req,res)=>{
    try{
        const authorId = req.id;
        const posts = await Post.find({author:authorId}).short({createdAt:-1}).populate({
            path:'author',
            select:'username,profilepicture'
        }).populate({
            path:"comments",
            sort:{createdAt:- -1},
            populate:{
                paht:'author',
                select:'username,profilePicture'
            }
        });
        return res.status(200).json({
            posts,
            success:true,
        });

    }catch(error){
        console.log(error);
    }
}

export const likePost = async(req,res)=>{
    try{
        const likeGarneWalaKoId = req.id
        const postId = req.params.id
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({message:"post not found",success:false});

        // like ligic
        await post.updateOne({$addToSet:{likes:likeGarneWalaKoId}});
        await post.save();

        // implement shocketIO for realtime notifacition


        return res.status(200).json({message:'post liked',success:true});


    }catch(err){
        console.log(err);
    }
}


export const disLikePost = async(req,res)=>{
    try{
        const likeGarneWalaKoId = req.id
        const postId = req.params.id
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({message:"post not found",success:false});

        // like ligic
        await post.updateOne({$pull:{likes:likeGarneWalaKoId}});
        await post.save();

        // implement shocketIO for realtime notifacition


        return res.status(200).json({message:'post disliked',success:true});

    }catch(err){
        console.log(err);
    }
}

export const addComment = async(req,res)=>{
    try{
        const postId = req.params.id;
        const commentGarneWalaKoId = req.id;
        const {text} = req.body;
        const post = await Post.findById(postId);
        if(!text) return res.status(400).json({message:"text is required",success:true});

        const comment = await Comment.create({
            text,
            author:commentGarneWalaKoId,
            post:postId
        }).populate({
            path:'author',
            select:'username , profilePicture'
        });

        post.comments.push(comment._id);
        await post.save();

        return res.status(201).json({
            message:"comment added",
            comment,
            success:"true"
        });

    }catch(error){
        console.log(error)
    }
}


export const getCommentsOfPost = async (req,res)=>{
    try{
        const postId = req.params.id;

        const comments = await Comment.find({post:postId}).populate('author','username,profilePicture');
        if(!comments) return res.status(404).json({message:'no comments found for this post,success:falst'});

        return res.status(200).json({success:true,comments})
    }catch(err){
        console.log(err);
    }
}



export const deletePost = async (req,res)=>{
    try{
        const postId = req.params.id;
        const authorId = req.id;

        const post = await Post.findById(postId);
        if(!postId) return res.status(404).json({message:'cant delete post',success:flase});

        if(post.author.toString!= authorId) return res.status(404).json({message:"unauthorized user",success:false});

        // delete post

        await post.findByIdAndDelete(postId);

        let user = await User.findById(authorId);

        user.post = user.posts.filter(id => id.toString()!= postId);
        await user.save();

        //delete associated comments--

        await Comment.deleteMany({post:postId});

        return res.status(200).json({
            message:'post deleted successfully',
            success:true
        })

        
    }catch(err){
        console.log(err);
    }
}


export const bookmarkPost = async (req,res)=>{
    try{

        const postId = req.params.id;
        const authorId = req.id;
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({message:"post not found",success:false});

        const user = await user.findById(authorId);
        if(user.bookmark.includes(post._id)){
            ////already bookmark remove
            await user.updateOne({$pull:{bookmarks:post._id}});
            await user.save();
            return res.status(200).json({type:'unsaved',message:'post remove from bookmark',success:true});
        }else{
            ///bookmark add
            await user.updateOne({$addToSet:{bookmarks:post._id}});
            await user.save();
            return res.status(200).json({type:'saved',message:'post bookmarked',success:true});
        }

    }catch(error){
        console.log("Error:",err);
    }
}

                ///api hasent tested-----



