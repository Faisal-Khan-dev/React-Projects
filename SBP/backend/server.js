import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
    .connect(process.env.MONGODB_URI)
    .then((res) => console.log("MongoDB connected!"))
    .catch((err) => console.log("MongoDB Error!:", err.message));