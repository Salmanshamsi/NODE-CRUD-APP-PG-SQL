import exress from "express"
import { configDotenv } from "dotenv";
import bodyParser from "body-parser";


// config..
configDotenv();
let app = exress();
let PORT = process.env.PORT || 5000

// middlewares...

app.use(bodyParser.json());

// api's..

app.use("/todo",()=>{
    console.log("hellworld")
})

// app listning..
app.listen(PORT, () => {
    console.log("server started");
})
