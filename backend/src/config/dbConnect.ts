import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();


type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect() {
  if (connection.isConnected) {
    console.log("Database already connected.");
    return;
  }
  console.log(process.env.MONGOOSE_URL)

  if (!process.env.MONGOOSE_URL) {
    console.error("MONGOOSE_URL is not defined in environment variables.");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGOOSE_URL as string);

    connection.isConnected = db.connections[0].readyState;

    if (connection.isConnected === 1) {
      console.log("✅ Database connection successful.");
    } else {
      console.warn("⚠️ Database connected but not in readyState 1.");
    }

  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Optional: Remove if you want graceful fallback
  }
}

export default dbConnect;
