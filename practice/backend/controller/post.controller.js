const sharp = require("sharp");
const cloudinary = require("cloudinary");
const { Post } = require("../model/post.model");
const User = require("../model/user.model.js");

const abbNewPost = async (req,res)=>{
    try{
        const {caption} = req.body;
        const image = req.file;
        const autherId = req.id;

        if(!image){
            return res.status.json({
                message:"image required",
                success:false,
            });
        }

        const optimizedImageBuffer = await sharp(image.buffer)
        .resize({width:800,height:800,fit:'inside'})
        .toFormat("jpeg",{quality:80})
        .toBuffer();

        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
        const cloudResponse = await cloudinary.uploader.upload(fileUri);

        const post = await Post.create({
            caption,
            image:cloudResponse.secure_url,
            author:autherId
        });

        const user = await User.findById(autherId);

        if(user){
            user.posts.push(post._id);
            await user.save()
        }

        await post.populate({path:"author",select:"-password"});

    }catch(err){
        console.log(err);
    }
}

const getAllPost = async(req,res)=>{
    const posts = await Post.find().short({createdAt:-1})
                        .populate({path:"author",select:'username , profilePicture'})
                        .populate({
                            path:"comments",
                            sort:{createdAt:-1},
                            populate:{
                                path:'author',
                                select:' username , profilePicture '
                            }
                        });
}


module.exports = { abbNewPost }