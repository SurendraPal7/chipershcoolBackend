// config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const { DB_USER, DB_PASS, DB_NAME } = process.env;

const encodedUser = encodeURIComponent(DB_USER);
const encodedPass = encodeURIComponent(DB_PASS);

const MONGODB_URI = `mongodb+srv://${encodedUser}:${encodedPass}@cluster0.ucggsmz.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.set("strictQuery", false);         

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

