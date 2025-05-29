import express from "express";
import userRoutes from "./routes/user.routes";
import dbConnect from "./config/dbConnect";
import urlRoutes from "./routes/url.routes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());



dbConnect()
app.use('/api',userRoutes)

app.use('/api',urlRoutes)

app.listen(5000, () => {
    console.log("App started at port 5000")
})