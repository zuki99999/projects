import express, { urlencoded } from "express";
const app = express();
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import postRoute from "./routes/post.rout.js"
import messageRoute from "./routes/message.route.js"
dotenv.config({});

const port = process.env.PORT || 8000;


app.get("/",(req,res)=>{
    return res.status(200).json({
        message:"backend message",
        success:true
    })
});

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true}));

const crosOption = {
    origin:`http://localhost:5173`,
    credentials:true,
}
app.use(cors(crosOption));

// api
app.use("/api/v1/user",userRoute);
app.use("/api/v1/post",postRoute);
app.use("/api/v1/message",messageRoute);


app.listen(port,()=>{
    connectDB();
    console.log(`server listen at port ${port}`)
});

