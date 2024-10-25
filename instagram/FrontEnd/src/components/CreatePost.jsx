import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
// import { useSearchParams } from "react-router-dom";
import { readFileAsDataURL } from "@/lib/utils";
import { Loader2, Send } from "lucide-react";
import axios from "axios";
import { Content } from "@radix-ui/react-dialog";
import { toast } from "sonner";

function CreatePost({ open, setOpen }) {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loding , setLoding] = useState(false);

  async function fileChangeHandler(e) {
    const file = e.target.files?.[0]; //optional chaning
    if (file) {
      setFile(file);
    }
    const dataUrl = await readFileAsDataURL(file);
    setImagePreview(dataUrl);
  }

  async function createPostHandler(e) {
    e.preventDefault();
    try {
    setLoding(true);
    const formData = new FormData();
    formData.append("capption",caption);
    if(imagePreview) formData.append('image',file)//image name in multer in backend
    const res = await axios.post("http://localhost:8000/api/v1/post/addpost",formData,{
        headers: {
            "Content-Type": "multipart/form-data",
          },
         withCredentials:true
    }
    )
    if(res.data.success){
        toast.success(res.data.message);
        setCaption("");
      setImagePreview("")
    }

    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }finally{
        setLoding(false);
    }
  }

  return (
    <>
      <Dialog open={open}>
        <DialogContent onInteractOutside={() => setOpen(false)}>
          <div className="flex justify-between">
            <DialogHeader className="text-center font-semibold">
              create new post
            </DialogHeader>

            {
                imagePreview && (
                    loding ? (
                        <div >
                        <Button variant="outline" type="submit" onClick={createPostHandler}>
                   <Loader2 className="animate-spin text-gray-400"/>
                       </Button>   
                   </div>
                ):(
                        <div >
                            <Button variant="outline" type="submit" onClick={createPostHandler}>
                            <Send />
                            </Button>
                        </div>
                )

            )}
            
          </div>
        
          <div className="flex gap-3 items-center>">
            <Avatar>
              <AvatarImage src="" alt="img" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold text-xs">Username</h1>
              <span className="text-gray-600 text-xs">Bio here...</span>
            </div>
          </div>

          <div className="flex  flex-col gap-3">
            <Textarea
              className="focus-visible:ring-transparent border-none"
              placeholder="warite a caption..."
              value={caption}
              onChange={(e)=>setCaption(e.target.value)}
            />

            <input
              ref={imageRef}
              type="file"
              className="hidden"
              onChange={fileChangeHandler}
            />
          </div>

          {
            imagePreview &&
                <img
                src={imagePreview}
                alt="previewImage"
                className=" rounded-md mb-7"
              />
        
          }

          <Button
            onClick={() => imageRef.current.click()}
            className="w-fit mx-auto bg-gray- border shadow shadow-zinc-300 text-black font-bold hover:bg-gray-100"
          >
            select from computer
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreatePost;


{/* <Button variant="outline" type="submit" onClick={createPostHandler}>
<Send />
</Button> */}