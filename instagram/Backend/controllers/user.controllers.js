
import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudanary.js";
import path from 'path';
path.resolve('../model/user.model.js');


// app.use(express.urlencoded({ extended: true }));

export const register = async (req,res)=>{
    try{
        
        const {username,email,password} = req.body;
        if(!email||!password||!username){
            return res.status(401).json({
                message:"All fields are required",
                success:false
            });
        };

        const u_name_check = await User.findOne({username})
        if(u_name_check){
            return res.status(401).json({
                message:"username already exist",
                success:false
            });
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({
                message:"username already exist",
                success:false
            });
        };

        let hashedPassword = await bcrypt.hash(password,10);
        await User.create({
            username,
            email,
            password:hashedPassword
        });

        return res.status(201).json({
            message: "user created successfully",
            success:true,
        });

    }catch(err){
        console.log("error:",err);
    }
    }

    // login--

export const login = async(req,res)=>{
    try{

        const {email,password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                message:"something is missing",
                success:false
            });
        }

        let user = await User.findOne({email});
        const populatedPost = await Promise.all(
            user.post.map(async(postId)=>{
                const post = await post.findById(postId);
                
                if(post.author.equals(user._id)){
                    return post
                }return null;
            })
        )
        if(!user){
            return res.status(401).json({
                message:"email doesnot exixt",
                success:false
            });
        }

        const isPassword = await bcrypt.compare(password,user.password);  
        if(!isPassword){
            res.status(401).json({
                message:"invalid password email or password",
                success:false
            });
        }

        user = {
            _id:user._id,
            username:user.username,
            email:user.email,
            profilePicture:user.profilePicture,
            boi:user.bio,
            followers:user.followers,
            following:user.following,
            post:populatedPost
        }

        const token = await jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:"1d"});
        //populate each post in the post array...
        

        return res.cookie("token",token,{httpOnly:true,sameSite:"strict",maxAge: 1*24*60*60*1000}).json({
            message:`welcome back ${user.username}`,
            success: true,
            user
        });
 
    }catch(err){
        console.log("error:",err);
    }
}

export const logout  = async (_,res) => {
    try{
        return res.cookie("token","",{maxAge:0}).json({
            message: "logged out successfully",
            success:true,
        })
    }catch(err){
        console.log("error:",err);
    }
}

export const getprofile = async(req,res)=>{
    try{
        const userId = req.params.id;
        let user = await User.findById(userId).select('-password');
        return res.status(200).json({
            user,
            success:true,
        });
    }catch(err){
        console.log("error:",err);
    }
}

export const editProfile = async (req,res)=>{
    try{

        const userId = req.id;
        const {bio , gender} = req.body;
        let profilePicture = req.file;
        let cloudResponse;
        
        if(profilePicture){
            const fileUri = getDataUri(profilePicture);
            cloudResponse = await cloudinary.uploader.upload(fileUri);
        }
        console.log(cloudResponse);
        const user = await User.findById(userId);
        if(!user){
           return res.status(404).json({
            message:"user not found",
            success:false
           });
        };
        if(bio) user.bio = bio;
        if(gender) user.gender = gender;
        if(profilePicture) user.profilePicture = cloudResponse.secure_url;


        await user.save()
        return res.status(200).json({
            message:" profile updated ",
            success:true,
            user
        });
    }catch(err){
        console.log("error:",err);
    }
};

export const getSuggestedUsers = async (req,res)=>{

    try{
        const suggestedUsers = await User.find({_id:{$ne:req.id}}).select("-password");
        if(!suggestedUsers){
            return res.status(401).json({
                messgaer:"donat have suggestion",
            })
        }
        return res.status(400).json({
            success:true,
            users:suggestedUsers,
        });

    }catch(err){
        console.log("err:",err);
    }
}

export const followOrUnfollow = async (req,res)=>{
    try{
        const followGarneWala = req.id;
        const jolaiFollowGarneHo = req.params.id;
        
        if(followGarneWala === jolaiFollowGarneHo){
            return res.Status(400).json({
                message:"you cant follow/unfollow",
                success:false,
            });
        };
        const user = await User.findById(followGarneWala);
        const targetUser = await User.findById(jolaiFollowGarneHo);

        if(!user || !targetUser){
            return res.Status(400).json({
                message:"user not found",
                success:false,
            });
        };

        const idFollowing = user.following.includes(jolaiFollowGarneHo);//return true
        if(idFollowing){
            //unfollow
            await Promise.all([
                User.updateOne({_id:followGarneWala},{$pull:{following:jolaiFollowGarneHo}}),
                User.updateOne({_id:jolaiFollowGarneHo},{$pull:{followers:followGarneWala}}),
            ]);
            return res.status(200).json({
                message:"unfollow successfully",
                success:true,
            });
        }else{
            //follow
            await Promise.all([
                User.updateOne({_id:followGarneWala},{$push:{following:jolaiFollowGarneHo}}),
                User.updateOne({_id:jolaiFollowGarneHo},{$push:{followers:followGarneWala}}),
            ]);
            return res.status(200).json({
                message:"followed successfully",
                success:true,
            });
        };

    }catch(err){console.log("error:",err);}
}

