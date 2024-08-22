import express from "express";
import { updateData,setData,getData,getDataById,deleteData } from "../Controller/todo.mjs";

let app = express.Router();

app.post("/v1/add",(reqs,resp)=>{
    setData(reqs,resp);
});
app.get("/v1/get",(reqs,resp)=>{
    getData(reqs,resp)
});
app.get("/v1/get/:id",(reqs,resp)=>{
    getDataById(reqs,resp)
});
app.put("/v1/edit/:id",(reqs,resp)=>{
    updateData(reqs,resp)
});
app.delete("/v1/delete/:id",(reqs,resp)=>{
    deleteData(reqs,resp)
});

export default app;