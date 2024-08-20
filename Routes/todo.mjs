import express from "express";
import { updateData,setData,getData,getDataById,deleteData } from "../Controller/todo.mjs";

let app = express.Router();

app.post("/",(reqs,resp)=>{
    setData(reqs,resp);
});
app.get("/",(reqs,resp)=>{
    getData(reqs,resp)
});
app.get("/:id",(reqs,resp)=>{
    getDataById(reqs,resp)
});
app.put("/:id",(reqs,resp)=>{
    updateData(reqs,resp)
});
app.delete("/:id",(reqs,resp)=>{
    deleteData(reqs,resp)
});

export default app;