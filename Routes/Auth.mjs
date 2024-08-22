import express from "express";
import { AuthanticateUser, AuthanticateUser_v2, CreateUser, CreateUser_v2 } from "../Controller/Auth.mjs";


let app = express.Router();

app.post("/v1/signup",(reqs,resp)=>{
    CreateUser(reqs,resp);
});

app.post("/v1/signin",(reqs,resp)=>{
    AuthanticateUser(reqs,resp);
});

// v2..

app.post("/v2/signup",(reqs,resp)=>{
    CreateUser_v2(reqs,resp);
});

app.post("/v2/signin",(reqs,resp)=>{
    AuthanticateUser_v2(reqs,resp);
});

export default app;