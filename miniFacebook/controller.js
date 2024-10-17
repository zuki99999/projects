const User = require('./model/user');


const home = (_,res)=>{///get
    res.render('index');
};

const read = async(req,res)=>{//get
    try {
        

    const users = await User.find();
    res.render('read',{users});
    console.log(users);

} catch (error) {
    console.log(error)
}
};

const create = async(req,res)=>{//post

    try{
    const {name , email , image} = req.body;

    const createdUser = await User.create({
        name,
        email,
        image
    });
    res.redirect("/read");

} catch (error) {
    console.log(error)
}
};

const deleteUser = async(req,res)=>{//get ('/delete/:id',
    try{

    await User.findOneAndDelete({_id:req.params.id});
     res.redirect("/read");

    } catch (error) {
        console.log(error)
    }
};

const edit = async(req,res)=>{//get  ('/edit/:id',

    try{
   let user = await User.findById({_id:req.params.id});
    res.render("edit",{user});

} catch (error) {
    console.log(error)
}
};

const update = async(req,res)=>{//post  ('/update/:id'
    try{
    const {name,email,image} = req.body;
     await User.findByIdAndUpdate({_id:req.params.id},{name,email,image});
     res.redirect("/read");

    } catch (error) {
        console.log(error)
    }
};

module.exports = {home,read,deleteUser,edit,update,create};

