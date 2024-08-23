import pool from "../Postgres/db.mjs"
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { config } from "dotenv"
config({path:`${process.cwd()}/.env`});


const CreateUser = async (reqs, resp) => {
    const { name, email, password } = reqs.body;

    const id = uuidv4();
    const hashPass = await bcrypt.hash(password, 12);

    try {
        const result = await pool.query(
            `INSERT INTO "users" (id, name, email, password) VALUES ($1, $2, $3, $4)`,
            [id, name, email, hashPass]
        );

        console.log(result);

        resp.status(201).json({
            message: 'User created successfully',
            data: {
                id,
                name,
                email,
                hashPass
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
const AuthanticateUser = async (req, resp) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            `SELECT * FROM "users" WHERE "email" = $1`,
            [email]
        );

        if (result.rows.length === 0) {
            return resp.status(401).json({
                message: "Invalid email or password",
            });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return resp.status(401).json({
                message: "Invalid email or password",
            });
        }
        var token = jwt.sign({email}, process.env.token);
        resp.status(200).json({
            message: "Sign in successfully",
            token:token,
        });

    } catch (err) {
        console.error('Error signing in:', err);
        resp.status(500).json({
            message: 'Failed to sign in user',
            error: err.message,
        });
    }
};


export {AuthanticateUser, CreateUser}