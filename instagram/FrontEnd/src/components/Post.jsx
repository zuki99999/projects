import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import CommentDialog from "./commentDialog";
// import {FaRegHeart} from 'react-icons'

function Post() {
    const [text,setText] = useState('');
    const [open ,setOpen] = useState(false);

    function changeEventHandler(event){
       const input = event.target.value
       if(input.trim()){
        setText(input);
       }else{
        setText('');
    }
    }
  return (
    <>
      <div className="my-8 w-full max-w-sm mx-auto pb-5 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="" alt="post_Image" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1>username</h1>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <MoreHorizontal className="cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="flex flex-col items-center text-center">
              <Button
                variant="ghost"
                className="cursor-pointer w-fit text-[#ED4956] font-bold"
              >
                Unfollow
              </Button>
              <Button variant="ghost" className="cursor-pointer w-fit ">
                add to favorites
              </Button>
              <Button variant="ghost" className="cursor-pointer w-fit">
                Delete
              </Button>
            </DialogContent>
          </Dialog>
        </div>
        <img
          src=" https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg "
          className="rounded-sm my-2 w-full aspect-square object-contain"
          alt="post_image"
        />

        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <Heart size={"25px"} className="cursor-Pointer hover:text-gray-600"/>
            <MessageCircle onClick={()=>setOpen(true)} className="cursor-Pointer hover:text-gray-600" />
            <Send className="cursor-Pointer hover:text-gray-600" />
          </div>
          <Bookmark className="cursor-Pointer hover:text-gray-600"/>
        </div>
        <div className="flex flex-row items-center  gap-4">
        <span className="font-medium block ">1k likes</span>
        <span onClick={()=>setOpen(true)} className=" cursor-pointer text-gray-500">10 comments</span>
        </div>
        <p>
            <span className="font-medium mr-2">username</span>
            caption
        </p>
        <CommentDialog open={open} setOpen={setOpen}/>
        
        <div className="flex justify-between items-center">
            <input type="text" placeholder="add a comment" onChange={changeEventHandler} value={text} className="outline-none text-sm w-full"/>
        {
            text && <span className="text-[#3BADF8]" >Post</span>
        }
        </div>
        
      </div>
    </>
  );
}

export default Post;
