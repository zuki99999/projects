import axios from 'axios';
import { Button } from './ui/button'
import { Input } from './ui/input'
import React, { useState } from 'react'
import { toast } from 'sonner';

function Signup() {

    const [input , setInput] = useState({
        username:"",
        email:"",
        password:""
    });

    function changeEventHandler(e){
        setInput({...input , [e.target.name]:e.target.value});
    }

    async function  signupHandler(e){
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/v1/user/register',input,{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            });
            console.log(res);
            if(res.data.success){
                toast.success(res.data.message);
                setInput({
                    username:'',
                    email:"",
                    password:""
                });
            }

        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }

  return (
    <>

<div className='flex items-center w-screen h-screen justify-center'>
    <form onSubmit={signupHandler} className='shadow-xl shadow-rose-100 flex flex-col gap-5 p-8 rounded-lg'>

        <div>
            <h1 className='text-center font-bold'>LOGO</h1>
            <p className='text-center px-14'>login to see friends</p>
        </div>

        <div >
        <span className="py-2 font-medium ">username</span>
        <Input type="text" value={input.username} name="username" onChange={changeEventHandler}  className="focus-visible:ring-transparent"/>
        </div>

        <div>
        <span className="py-2 font-medium">email</span>
        <Input type="email" value={input.email} name="email" onChange={changeEventHandler} className="focus-visible:ring-transparent"/>
        </div>

        <div>
        <span className="py-2 font-medium">password</span>
        <Input type="password" value={input.password} name='password' onChange={changeEventHandler} className="focus-visible:ring-transparent"/>
        </div>

        <Button type="submit">Submit</Button>
        <span>already has an account?</span>

    </form>
</div>
      
    </>
  )
}

export default Signup;

