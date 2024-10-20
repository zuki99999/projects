import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {

    const navicate = useNavigate();

    const [input,setInput] = useState({
        username:'',
        email:'',
        password:''
    });

    function handleOnchange(e){
        setInput({...input,[e.target.name]:e.target.value});
    }

    const [loding , setLoding] = useState(false);

    async function hanldeOnSubmit(e){
        e.preventDefault();

        try {

            setLoding(true);

            const res = await axios.post('http://localhost:8000/api/v1/user/register',input,{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            });
            console.log("User registered successfully:", res.data);

        
            if (res.data.success) {
                navicate("/login");
                toast.success(res.data.message);
                setInput({
                    username:'',
                    email:'',
                    password:''
                });
            }
            
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            setLoding(false);
        }
    }

  return (
    <>

    <div className="flex h-screen w-screen justify-center items-center">

            <form onSubmit={hanldeOnSubmit} className="shadow-lg flex flex-col gap-3 p-8 rounded-lg ">

                <div className="">
                    <h1 className='font-bold text-center'>logo</h1>
                    <p>signup to see friends and family</p>
                </div>

                <div className=''>
                    <h3>username</h3>
                    <Input value={input.username} onChange={handleOnchange} name="username" className="focus-visible:ring-transparent" />
                </div>

                <div className=''>
                    <h3>email</h3>
                    <Input value={input.email} onChange={handleOnchange} name="email" type="email" className="focus-visible:ring-transparent"/>
                </div>

                <div className=''>
                    <h3>passsword</h3>
                    <Input value={input.password} onChange={handleOnchange} name="password" type="password" className="focus-visible:ring-transparent"/>
                </div>

                <Button type="submit">submit</Button>
                <span className='text-center'>Already have an account: <Link to="/login" className='text-blue-600'>login</Link></span>

            </form>

    </div>
      
    </>
  )
}

export default Signup;




// // import axios from 'axios';
// import { Button } from './ui/button'
// import { Input } from './ui/input'
// import React, { useState } from 'react'


// function Signup() {

//     const [input , setInput] = useState({
//         username:"",
//         email:"",
//         password:""
//     });

//     function changeEventHandler(e){
//         setInput({...input , [e.target.name]:e.target.value});
//     }

//     async function  signupHandler(e){
//         e.preventDefault();
//         try {
//             const res = await axios.post('http://localhost:8000/api/v1/user/register',input,{
//                 headers:{
//                     "Content-Type":"application/json"
//                 },
//                 withCredentials:true
//             });
//             console.log(res);
//             if(res.data.success){

//                 setInput({
//                     username:'',
//                     email:"",
//                     password:""
//                 });
//             }

//         } catch (error) {

//             console.log(error);
//         }
//     }

//   return (
//     <>

// <div className='flex items-center w-screen h-screen justify-center'>
//     <form onSubmit={signupHandler} className='shadow-xl shadow-rose-100 flex flex-col gap-5 p-8 rounded-lg'>

//         <div>
//             <h1 className='text-center font-bold'>LOGO</h1>
//             <p className='text-center px-14'>login to see friends</p>
//         </div>

//         <div >
//         <span className="py-2 font-medium ">username</span>
//         <Input type="text" value={input.username} name="username" onChange={changeEventHandler}  className="focus-visible:ring-transparent"/>
//         </div>

//         <div>
//         <span className="py-2 font-medium">email</span>
//         <Input type="email" value={input.email} name="email" onChange={changeEventHandler} className="focus-visible:ring-transparent"/>
//         </div>

//         <div>
//         <span className="py-2 font-medium">password</span>
//         <Input type="password" value={input.password} name='password' onChange={changeEventHandler} className="focus-visible:ring-transparent"/>
//         </div>

//         <Button type="submit">Submit</Button>

//     </form>
// </div>
      
//     </>
//   )
// }

// export default Signup;
