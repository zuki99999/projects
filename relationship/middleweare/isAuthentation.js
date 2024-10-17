const  pkg = require('jsonwebtoken');
const { verify } = pkg;

             
const isAuthenticated = async(req,res,next)=>{
    try{
        console.log("aut");
        console.log(req.cookies);
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"user not authenticated",
                success:false
            });
        }

        const decode = await verify(token , "sagar");
        if(!decode){
            return res.status(401).json({
                message:"invalid",
                success:false,
            });
        }
        req.id = decode.userId;
        next();
    }catch(err){()=>console.log("error:",err)}
}

module.exports = {isAuthenticated};