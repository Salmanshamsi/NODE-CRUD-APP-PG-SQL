import pool from "../Postgres/db.mjs"
import User from "../models/User.mjs"
import { v4 as uuidv4 } from 'uuid';


const CreateUser = async (reqs, resp) => {
    const { name, email, password } = reqs.body;

    const id = uuidv4();

    try {
        const result = await pool.query(
            `INSERT INTO "users" (id, name, email, password) VALUES ($1, $2, $3, $4)`,
            [id, name, email, password]
        );

        console.log(result);

        resp.status(201).json({
            message: 'User created successfully',
            data: {
                id,
                name,
                email
            }
        });
    } catch (error) {
        console.error('Error creating user:', error);

        resp.status(500).json({
            message: 'Failed to create user',
            error: error.message
        });
    }

    return;
};
const AuthanticateUser = async (reqs,resp) => {
    
    const {email, password} = reqs.body;

    try{

        const result = await pool.query(
            `SELECT * FROM "users" WHERE "email" = $1 AND "password" = $2`,
            [email, password]
        );
        
        console.log(result);

        resp.status(201).json({
            message:"sign in sucessfully",
        })

    }catch(err){
        console.error('error signin-',err);
        resp.status(500).json({
            message: 'Failed to signin user',
            error: err.message
        })
    }


};
const CreateUser_v3 = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
      } catch (err) {
        res.status(400).json({ error: err.message });
        console.log(err)
      }
    return;
};
const AuthanticateUser_v3 = async (req,res) => {
    
    const {email, password} = req.body;

    try {
        const user = await User.findAll({where:{email:email,password:password}});
        if(!user){
            res.status(201).json("user not found !");
        }else{
            res.status(201).json(user);
        }
      } catch (err) {
        res.status(400).json({ error: err.message });
        console.log(err)
      }
    return;

};

export {AuthanticateUser, CreateUser,CreateUser_v3,AuthanticateUser_v3}