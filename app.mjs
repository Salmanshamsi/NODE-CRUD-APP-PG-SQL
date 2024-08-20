import exress from "express"
import { configDotenv } from "dotenv";
import bodyParser from "body-parser";
import todo from "./Routes/todo.mjs"
import ConnectingToDB from "./PG/Pg.mjs";


// config..
configDotenv();
let app = exress();
let PORT = process.env.PORT || 5000;

// middlewares...
app.use(bodyParser.json());


// api's..
app.use("/todo",todo)

// app listning..
app.listen(PORT, () => {
    // DBConnection...
    ConnectingToDB();
    console.log("server started");
})
