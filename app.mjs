import exress from "express"
import { config } from "dotenv"
import bodyParser from "body-parser";
import todo from "./Routes/todo.mjs";
import Auth from './Routes/Auth.mjs'
import pool from "./Postgres/db.mjs";
import { verifyUser } from "./utils.mjs";


// config..
config({path:`${process.cwd()}/.env`})
let app = exress();
let PORT = process.env.PORT ;

// middlewares...
app.use(bodyParser.json());


// api's..

app.use('/auth',Auth);
app.use("/todo",verifyUser,todo);
app.use((reqs, resp) => {
    resp.status(404).json({
        error: 'Page not found'
    });
});

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
