import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

function Login() {

    const nevicate = useNavigate();

    const [input,setInput] = useState({
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

            const res = await axios.post('http://localhost:8000/api/v1/user/login',input,{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            });
            console.log("User registered successfully:", res.data);

        
            if (res.data.success) {
                nevicate("/");
                toast.success(res.data.message);
                setInput({
                    email:'',
                    password:''
                })
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
                    <p>login to see friends and family</p>
                </div>

                <div className=''>
                    <h3>email</h3>
                    <Input value={input.email} onChange={handleOnchange} name="email" type="email" className="focus-visible:ring-transparent"/>
                </div>

                <div className=''>
                    <h3>passsword</h3>
                    <Input value={input.password} onChange={handleOnchange} name="password" type="password" className="focus-visible:ring-transparent"/>
                </div>


                {
                    loding ? (
                        <Button>
                            <Loader2 className='mr-2 h-4 animate-spin'/>
                        
                        </Button>
                    ) : (
                        <Button type="submit">Login</Button>
                    )
                }
                
                <span className='text-center'>don't have an account: <Link to="/signup" className='text-blue-600'>register</Link></span>


            </form>

    </div>
      
    </>
  )
}

export default Login;


