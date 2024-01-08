
import express from "express"
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogrouter from "./routes/blog-route.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

//middleware
app.use(express.json());

//middleware
app.use("/api/user", router) 

//blog route
app.use("/api/blog", blogrouter)


mongoose.connect(process.env.DB)

    .then(() => console.log('connected'))
    .catch((err) => {
        console.log(err)
    })



app.listen(process.env.port, (req, res) => {
    console.log('first')
})

