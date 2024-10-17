const User = require("../model/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getDataUri = require("../utils/datauri");    
const {  v1 } = require("../utils/cloudinary");


const register = async (req,res)=>{

    try{

    const {username, password,email} = req.body;
    console.log(req.body);

    if(!username || !password || !email){return res.status(400).json({
        message:"something is messing",
        succes:false
    });
}

const user = await User.findOne({email});
console.log("user",user);
if(user){
    return res.status(404).json({
        message:"user already exist",
        succes:false
    })
}
    const hashPashword = await bcrypt.hash(password,10);
     await User.create({
        username:username,
        email:email,
        password:hashPashword
    }).then(() => {
       console.log("user created") 
    }).catch((err) => {
        console.log(err);
    });

    return res.json({
        message:`hello ${req.body.username}`,
        succes:true
    });

}catch(err){
    console.log(err);
}

}

const login = async (req,res)=>{

    try {

        const {email,password} = req.body;

        if(!email||!password){
            return res.status(404).json({
                message:"something is missing",
                success:false
            });
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                message:"no such user found",
                success:false
            });
        }
        
        const isPassword = await bcrypt.compare(password,user.password);
        if(!isPassword){
            return res.status(404).json({
                message:"invalid email or password",
                success:false
            });
        }

        console.log(user);

        const token = await jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:"1d"});
        return res.cookie('token',token,{httpOnly:true,sameSite:'strict',maxAge:1*24*60*60*1000}).json({
            message:`welcome back ${user.username}`,
            success:true
        });

    } catch (error) {
        console.log(error);
    }

}

const logout = async(__,res)=>{

    try{
        return res.cookie("tokrn","",{maxAge:0}).json({
            message:"log out successfully",
            success:true
        })
    }catch(err){
     console.log(err);
    }

}

const getProfile = async(req,res)=>{
    try{
        const userId = req.params.id;
        let user = await User.findById(userId).salect("-password");
        return res.status(200).json({
            suddess:true,
            user
        })

    }catch(err){
        console.log(err);
    }
}

const editProfile =async(req,res)=>{
    try{
        const userId = req.id;
        const {gender , bio} = req.body;
        const profilePicture = req.file;
        let cloudResponse;

        if(profilePicture){
            const fileUri = getDataUri(profilePicture);
            // await cloudinary.uploder.upload(fileUri)
            await v1.uploder.upload(fileUri);
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).josn({
                message:"usernot found",
                success:flase
            });
        }

        if(bio) user.bio = bio;
        if(gender) user.gender = gender;
        if(profilePicture) user.profilePicture = cloudResponse.secure_Url;

        await user.save();

        return res.status(200).json({
            message:"profile updated",
            success:true,
            user
        });

    }catch(err){
        console.log(err);
    }
}

const getSuggestedUsers = async(req,res)=>{
    try{
        const id = req.pa
        const suggestedUsers = await User.findById({_id:{$ne:req.id}}).select("-password");

        if(!password){
            return res.status(400).json({
                message:"no suggestiion",
                success:false
            });
        }

        return res.status(200).json({
            success:true,
            users:suggestedUsers
        })

    }catch(error){
        console.log("error",error);
    }
}

const followOrUnfollow = async(req,res)=>{
    try{
        const afnoId = req.id;
        const arukoId = req.params.id;

        if(afnoId == arukoId){
            return res.status(400).json({
                message:"cannot follow or unfollow",
                success:false
            });
        };

        const user = await User.findById(afnoId);
        const target = await User.findById(arukoId);

        if(!user || !target){
            return res.status(400).json({
                message:"user not found",
                success:false
            });
        };

        const isFollowing = user.following.includes(arukoId);
        if(isFollowing){
            // unfollow
            await Promise.all([
                user.updateOne({_id:afnoId},{$pull:{following:target}}),
                user.updateOne({_id:target},{$pull:{follwers:afnoId}})
            ])
            return res.status(200).json({
                message:`unfollowed ${target.username}`,
                success:true
            });
        }else{
            // follow
            await Promise.all([
                user.updateOne({_id:afnoId},{$push:{following:target}}),
                user.updateOne({_id:target},{$push:{follwers:afnoId}})
            ])//there might be some logic error..
            return res.status(200).json({
                message:`followed ${user.username}`,
                success:true
            });
        }

    }catch(err){
        console.log(err);
    }
}

module.exports = {register,login,logout,getProfile,editProfile,getSuggestedUsers,followOrUnfollow};
