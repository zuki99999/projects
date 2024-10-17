

export const register = async(req,res)=>{
    try{

    const user = req.body;

    if(!user.username || !user.email || !user.password){
        return res.status(404).json({
            message:"something is missing",
            sussess:false
        });
    }

    const doesExist = User.findOne({email:user.email}) ;
    if(doesExist){
        return res.status(404).json({
            message:"email already exist",
            success:flase,
        });
    }

    let hassPassword = await bcrypt.hash(user.password,10);
    await User.create({
        username:user.username,
        email:user.email,
        password:hassPassword
    });

    return res.status(200).json({
        message:"user created successfully",
        success:true
    });

}catch(error){
    console.log(error);
}

}

export const login = async (req,res)=>{

   const {email,password} = req.body;

   if(!email || !password){
    return res.status(404).json({
        mesage:"something is messing",
        success:false
    });
   }

   const user = await User.findOne({email});
   if(!user)return res.status(404).json({
    message:"cant find user",
    success:false
   });




}