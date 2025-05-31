import express from "express";
import userRoutes from "./routes/user.routes";
import dbConnect from "./config/dbConnect";
import urlRoutes from "./routes/url.routes";
import cors from "cors";
import dotenv from "dotenv";

import helmet from 'helmet';
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

dotenv.config();
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());



dbConnect()
app.use('/api',userRoutes)


app.use('/api',urlRoutes)

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});