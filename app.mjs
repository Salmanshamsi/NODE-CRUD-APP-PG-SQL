import exress from "express"
import { config } from "dotenv"
import bodyParser from "body-parser";
import todo from "./Routes/todo.mjs"
import pool from "./Postgres/db.mjs";


// config..
config({path:`${process.cwd()}/.env`})
let app = exress();
let PORT = process.env.PORT ;

// middlewares...
app.use(bodyParser.json());


// api's..
app.use("/todo",todo)

// app listning..
app.listen(PORT, () => {
    // DBConnection...
    pool.connect((err, client, release) => {
        if (err) {
        console.error('Failed to connect to the database:', err.stack);
        } else {
        console.log('Connected to the database');
        release();
        }
    });
    console.log("server started");
})
