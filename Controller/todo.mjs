import { v4 as uuidv4 } from 'uuid';
import pool from '../Postgres/db.mjs';
import { PrismaClient } from '@prisma/client';
import { where } from 'sequelize';
const prisma = new PrismaClient();


const setData = async(reqs,resp) => {

    const {title,description,status} = reqs.body;
    const id = uuidv4();
    const created_at = new Date();
    const updated_at = new Date();

    try{

        const result = await pool.query(
            `INSERT INTO "todo" (id, title, description, status, created_at, updated_at) 
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
             [id,title, description, status, created_at, updated_at]
        );
        console.log('todo added sucessfully !',result);
        resp.status(201).json({
            message:"todo item added",
        })        

    }catch(err){
        console.error('todo not added', err);
        resp.status(500).json({
            message:"todo item not added",
            error:err,
        })
    }

}
const getData = async (reqs,resp) => {
    try{

        const result = await pool.query(
            `SELECT * FROM "todo"`
        );

        console.log('todo get it sucessfully !',result);
        resp.status(201).json({
            message:"todo get it",
            data:result.rows
        })        

    }catch(err){
        console.error('not get todo ', err);
        resp.status(500).json({
            message:"todo item not get it",
            error:err,
        })
    }
}
const getDataById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(`SELECT * FROM todo WHERE id = $1`, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Todo item not found"
            });
        }

        console.log('Todo retrieved successfully!', result);
        res.status(200).json({
            message: "Todo retrieved successfully",
            data: result.rows[0]
        });

    } catch (err) {
        console.error('Error retrieving todo item', err);
        res.status(500).json({
            message: "Error retrieving todo item",
            error: err.message,
        });
    }
};
const updateData = async(reqs,resp) => {
    const { id } = reqs.params;
    const {title, description, status} = reqs.body;
    const updated_at = new Date();

    try {
        const result = await pool.query(`UPDATE todo SET title = $1,description = $2,status = $3,updated_at = $4
                                         WHERE id = $5
                                         RETURNING *;`, [title,description,status,updated_at,id]);

        console.log('Todo updated successfully!', result);
        resp.status(201).json({
            message:"todo updated sucessfully"
        }); 

    } catch (err) {
        console.error('Error updating todo item', err);
        resp.status(500).json({
            message: "Todo item not updated",
            error: err.message,
        });
    }
}
const deleteData = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(`DELETE FROM todo WHERE id = $1 RETURNING *`, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Todo item not found"
            });
        }

        console.log('Todo deleted successfully!', result);
        res.status(201).json({
            message:"todo deleted sucessfully"
        }); 

    } catch (err) {
        console.error('Error deleting todo item', err);
        res.status(500).json({
            message: "Todo item not deleted",
            error: err.message,
        });
    }
}


// v2...

const setData_v2 = async(reqs,resp) => {

    const {title,description,status} = reqs.body;
    const created_at = formatDateToDDMMYY(new Date);
    const modified_at = formatDateToDDMMYY(new Date);

    try{

        const result = await prisma.todo.create({data:{
            title,description,status,created_at,modified_at
        }})
        console.log('todo added sucessfully !',result);
        resp.status(201).json({
            message:"todo item added",
        })        

    }catch(err){
        console.error('todo not added', err);
        resp.status(500).json({
            message:"todo item not added",
            error:err,
        })
    }

}
const getData_v2 = async (reqs,resp) => {
    try{

        const result = await prisma.todo.findMany()

        console.log('todo get it sucessfully !',result);
        resp.status(201).json({
            message:"todo get it",
            data:result
        })        

    }catch(err){
        console.error('not get todo ', err);
        resp.status(500).json({
            message:"todo item not get it",
            error:err,
        })
    }
}
const getDataById_v2 = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the Todo item by id
        const result = await prisma.todo.findUnique({
            where: { id: Number(id) },
        });

        // Check if the todo item exists
        if (!result) {
            return res.status(404).json({
                message: "Todo item not found"
            });
        }

        console.log('Todo retrieved successfully!', result);
        res.status(200).json({
            message: "Todo retrieved successfully",
            data: result // Directly return the result, as there's no rows array
        });

    } catch (err) {
        console.error('Error retrieving todo item', err);
        res.status(500).json({
            message: "Error retrieving todo item",
            error: err.message,
        });
    }
};
const updateData_v2 = async(req,res) => {
    const { id } = req.params;
    const {title, description, status} = req.body;
    const modified_at = formatDateToDDMMYY(new Date());

    try {
        const result = await prisma.todo.update({
            where: { id: Number(id) },
            data: {
                title,       
                description, 
                status,
                modified_at      
            },
        });

        console.log('Todo updated successfully!', result);
        res.status(201).json({
            message:"todo updated sucessfully"
        }); 

    } catch (err) {
        console.error('Error updating todo item', err);

        if (err.code === 'P2025') { 
            return res.status(404).json({
                message: "Todo item not found",
                error: err.message,
            });
        }

        res.status(500).json({
            message: "Error updating todo item",
            error: err.message,
        });
    }
}
const deleteData_v2 = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await prisma.todo.delete({
            where: { id: Number(id) },
        });

        console.log('Todo deleted successfully!', result);
        res.status(200).json({
            message: "Todo deleted successfully",
            data: result 
        });

    } catch (err) {
        console.error('Error deleting todo item', err);

        if (err.code === 'P2025') { 
            return res.status(404).json({
                message: "Todo item not found",
                error: err.message,
            });
        }

        res.status(500).json({
            message: "Error deleting todo item",
            error: err.message,
        });
    }
};

function formatDateToDDMMYY(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
  
    return `${day}/${month}/${year}`;
  }
  

export {setData,getData,getDataById,updateData,deleteData,setData_v2,getDataById_v2,updateData_v2,deleteData_v2,getData_v2};