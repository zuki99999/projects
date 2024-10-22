import { Heart, Home, LogOut, LucideBike, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const sidebarItems = [
    {icon:<Home/>,text:"Home"},
    {icon:<Search/>,text:"Search"},
    {icon:<TrendingUp/>,text:"explore"},
    {icon:<MessageCircle/>,text:"message"},
    {icon:<Heart/>,text:"Notification"},
    {icon:<PlusSquare/>,text:"create"},
    {icon:(<Avatar className="w-7 h-7">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      ),text:"Profile"},
    {icon:<LogOut/>,text:"logout"},

]

function LeftSideBar() {

    const nevicate = useNavigate();

    const logoutHandler = async()=>{
        try {
            const res = await axios.get('http://localhost:8000/api/v1/user/logout',{withCredentials:true});
            if(res.data.success){
                console.log("if vitra")
                toast.success(res.data.message);
                nevicate("/login");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    function sidebarHandler(textType){
        if(textType==="logout"){logoutHandler()};
    }

    function clickHandlerr(e){
        alert(e.text)
    }

  return (
    <>
    {/* <div className='flex h-screen w-screen'> */}
    <div className=" fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen">

        <div className='flex flex-col  '>
            <h1 className='font-extrabold my-7 pl-3 text-xl '>Logo</h1>
            <div>
                {
                    sidebarItems.map((item,index)=>{
                        return(
                            <div onClick={()=>sidebarHandler(item.text)} key={index} className='flex items-center gap-2 my-4 font-bold relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 '>
                            {item.icon}
                            <span>{item.text}</span>
                            </div>
                            )
                    })
                }
            </div>
        </div>
        </div>
    {/* </div> */}

    </>
    
  )
}

export default LeftSideBar