import express from "express";
import userRoutes from "./routes/user.routes";
import dbConnect from "./config/dbConnect";
import urlRoutes from "./routes/url.routes";


const app = express();
app.use(express.json());


dbConnect()
app.use('/api',userRoutes)

app.use('/api',urlRoutes)

app.listen(3000, () => {
    console.log("App started at port 3000")
})