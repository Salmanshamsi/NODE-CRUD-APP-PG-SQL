import express from "express";
import { AuthanticateUser, CreateUser } from "../Controller/Auth.mjs";


let app = express.Router();

app.post("/signup",(reqs,resp)=>{
    CreateUser(reqs,resp);
});

app.post("/signin",(reqs,resp)=>{
    AuthanticateUser(reqs,resp);
});

export default app;