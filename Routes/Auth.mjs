import express from "express";
import { AuthanticateUser, CreateUser } from "../Controller/Auth.mjs";


let app = express.Router();

app.post("/v1/signup",(reqs,resp)=>{
    CreateUser(reqs,resp);
});

app.post("/v1/signin",(reqs,resp)=>{
    AuthanticateUser(reqs,resp);
});

export default app;