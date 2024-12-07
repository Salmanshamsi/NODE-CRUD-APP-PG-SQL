import exress from "express"
import { config } from "dotenv"
import bodyParser from "body-parser";
import todo from "./Routes/todo.mjs";
import Auth from './Routes/Auth.mjs'
// import pool from "./Postgres/db.mjs";
import sequelize from "./config/database.mjs";


// config..
config({path:`${process.cwd()}/.env`})
let app = exress();
let PORT = process.env.PORT ;

// middlewares...
app.use(bodyParser.json());


// api's..

app.use('/auth',Auth);
app.use("/todo",todo);
app.use((reqs, resp) => {
    resp.status(404).json({
        error: 'Page not found'
    });
});

// app listning..
app.listen(PORT, () => {
    // DBConnection...

    sequelize.sync().then(()=>{
        console.log("database connected !");
    }).catch(()=>{
        console.log("database not connected !");
    })

    console.log("server started");
})

