import express from "express";
import { updateData,setData,getData,getDataById,deleteData, setData_v2, getData_v2, getDataById_v2, updateData_v2, deleteData_v2 } from "../Controller/todo.mjs";

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

// v2 routing....

app.post("/v2/add",(reqs,resp)=>{
    setData_v2(reqs,resp);
});
app.get("/v2/get",(reqs,resp)=>{
    getData_v2(reqs,resp)
});
app.get("/v2/get/:id",(reqs,resp)=>{
    getDataById_v2(reqs,resp)
});
app.put("/v2/edit/:id",(reqs,resp)=>{
    updateData_v2(reqs,resp)
});
app.delete("/v2/delete/:id",(reqs,resp)=>{
    deleteData_v2(reqs,resp)
});

export default app;