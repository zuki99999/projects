import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";

function Post() {
  return (
    <>



    <div className="my-8 w-full max-w-sm mx-auto">
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="" alt="post_Image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
            <h1>username</h1>
        </div>

        <Dialog >
        <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer"/>
        </DialogTrigger>
        <DialogContent className="flex flex-col items-center text-center">
            <Button variant="ghost" className="cursor-pointer w-fit text-[#ED4956] font-bold" >Unfollow</Button>
            <Button variant="ghost" className="cursor-pointer w-fit " >add to favorites</Button>
            <Button variant="ghost" className="cursor-pointer w-fit" >Delete</Button>
        </DialogContent>
        </Dialog>

        </div>
        <img src=" https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg " className="rounded-sm my-2 w-full aspect-square object-contain" alt="post_image"
         />
      </div>

      <div className="">
    {/* <Fa */}
      </div>

      
    </>
  )
}

export default Post
