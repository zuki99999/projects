import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";


function CommentDialog({ open, setOpen }) {

  const [text , setText] = useState('');

  function changeEventHandler(e){
    const input = e.target.value;
    if(input.trim()){
      setText(input);
    }else{
      setText('');
    }
  }

  async function sendMessageHandler(){
    alert(text);
  }

  return (
    <>
      <Dialog open={open}>
        <DialogContent
          onInteractOutside={() => setOpen(false)}
          className="max-w-5xl p-0 flex flex-col"
        >
          <div className="flex flex-1 gap-5">
            <div className="w-1/2 ">
              <img
                className="w-full h-full rounded "
                src=" https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg "
                alt="post_image"
              />
            </div>

            <div className="w-1/2 flex flex-col justify-between">
              <div className="flex items-center justify-between p-4">
                <div className="flex justify-between icons-center gap-2">
                  <Link>
                    <Avatar>
                      <AvatarImage src="" alt="post_Image" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="pt-2">
                    <Link className="font-semibold text-sm">username</Link>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <MoreHorizontal className="cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent className="flex flex-col items-center text-sm">
                    <div className="cursor-pointer w-full text-[#ED4956] font-bold hover:bg-slate-100 p-2 rounded-lg ">
                      Unfollow
                    </div>
                    <div className="cursor-pointer w-full hover:bg-slate-100 p-2 rounded-lg">
                      add to fauvrate
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <hr />
              <div className="flex-1 overflow-y-auto max-h-96 p-4">
                allcomments
              </div>
              <div className="p-4">
                <div className="flex justify-between gap-1">
                  <input
                    value={text}
                    onChange={changeEventHandler}
                    type="text"
                    placeholder="add comment..."
                    className="w-full outline-none border border-gray-300 rounded-lg p-1"
                  />

                  {
                    text && <Button variant="outline" onClick={sendMessageHandler}> <Send/> </Button>
                  }   

                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CommentDialog;
