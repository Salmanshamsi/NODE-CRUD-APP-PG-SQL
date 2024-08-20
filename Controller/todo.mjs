

const setData = (reqs,resp) => {
    resp.send("i set the data !");
}
const getData = (reqs,resp) => {
    resp.send("i get the data !");
}
const getDataById = (reqs,resp) => {
    resp.send("i get the data by id !");
}
const updateData = (reqs,resp) => {
    resp.send("i update the data !");
}
const deleteData = (reqs,resp) => {
    resp.send("i delete the data !");
}

export {setData,getData,getDataById,updateData,deleteData};