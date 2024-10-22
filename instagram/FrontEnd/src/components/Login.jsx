import axios from 'axios';
import { Button } from './ui/button'
import { Input } from './ui/input'
import React, { useState } from 'react'
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Login() {

    const nevicate = useNavigate();

    const [loder , setLoder] = useState(false);

    const [input , setInput] = useState({
        username:"",
        email:"",
    });

    function changeEventHandler(e){
        setInput({...input , [e.target.name]:e.target.value});
    }

    async function  logoutHandler(e){
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/v1/user/login',input,{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            });
            if(res.data.success){
                setLoder(true);
                toast.success(res.data.message);
                setInput({
                    email:"",
                    password:""
                });
                     nevicate('/');
            }

        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }finally{
            setLoder(false);
        }
    }

  return (
    <>

<div className='flex items-center w-screen h-screen justify-center'>
    <form onSubmit={logoutHandler} className='shadow-xl shadow-rose-100 flex flex-col gap-5 p-8 rounded-lg'>

        <div>
            <h1 className='text-center font-bold'>LOGO</h1>
            <p className='text-center px-14'>login to see friends</p>
        </div>

        <div>
        <span className="py-2 font-medium">email</span>
        <Input type="email" value={input.email} name="email" onChange={changeEventHandler} className="focus-visible:ring-transparent"/>
        </div>

        <div>
        <span className="py-2 font-medium">password</span>
        <Input type="password" value={input.password} name='password' onChange={changeEventHandler} className="focus-visible:ring-transparent"/>
        </div>

        {
            loder ? (
                <Button>
                    <Loader2 className="animate-spin"/>
                </Button>
            ):(
                <Button type="submit">Submit</Button>
            )
        }

        <span>don't have an account? <Link className='text-blue-600' to="/signup">signup</Link></span>

    </form>
</div>
      
    </>
  )

}

export default Login
