const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt =require("jsonwebtoken");



const register = async (req,res)=>{




    

    try{









    const {username, password,email} = req.body;
    console.log(req.body);

    if(!username || !password || !email){
        return res.status(400).json({
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
    const result =  await User.create({
        username:username,
        email:email,
        password:hashPashword
    })

    return res.json({
        // message:`hello ${req.body.username}`,
        // succes:true,
        result
    });

}catch(err){
    console.log(err);
}

}

const login = async(req,res)=>{
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
            user.posts.map(async(postId)=>{
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
            post:populatedPost
        }

        const token = await jwt.sign({userId:user._id},"sagar",{expiresIn:"1d"});
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

const logout  = async (_,res) => {
    try{
        return res.cookie("token","",{maxAge:0}).json({
            message: "logged out successfully",
            success:true,
        })
    }catch(err){
        console.log("error:",err);
    }
}


module.exports = {register,login,logout};