import express from "express";
import { AuthanticateUser, AuthanticateUser_v3, CreateUser, CreateUser_v3 } from "../Controller/Auth.mjs";


let app = express.Router();

app.post("/v1/signup",(reqs,resp)=>{
    CreateUser(reqs,resp);
});

app.post("/v1/signin",(reqs,resp)=>{
    AuthanticateUser(reqs,resp);
});

// v3...

app.post("/v3/signup",(reqs,resp)=>{
    CreateUser_v3(reqs,resp);
});

app.post("/v3/signin",(reqs,resp)=>{
    AuthanticateUser_v3(reqs,resp);
});

export default app;