import express from "express";
import { updateData,setData,getData,getDataById,deleteData, setData_v3, getData_v3, getDataById_v3, updateData_v3, deleteData_v3 } from "../Controller/todo.mjs";

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

// v3......

app.post("/v3/add",(reqs,resp)=>{
    setData_v3(reqs,resp);
});
app.get("/v3/get",(reqs,resp)=>{
    getData_v3(reqs,resp)
});
app.get("/v3/get/:id",(reqs,resp)=>{
    getDataById_v3(reqs,resp)
});
app.put("/v3/edit/:id",(reqs,resp)=>{
    updateData_v3(reqs,resp)
});
app.delete("/v3/delete/:id",(reqs,resp)=>{
    deleteData_v3(reqs,resp)
});


export default app;