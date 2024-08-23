import jwt from "jsonwebtoken";
import { config } from "dotenv"
config({path:`${process.cwd()}/.env`});


const verifyUser = (req,resp,next) => {
    jwt.verify(req.headers.token,process.env.token,(err,decode)=>{
        if(err){
            return resp.send("Failed to Authenticate user");
        }
        next();
    })   
}

export {verifyUser}