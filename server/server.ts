import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import fileRoutes from './routes/files';
import {v2 as cloudinary} from 'cloudinary'

const PORT = process.env.PORT || 5500;
const app = express();
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_CLOUD,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/files", fileRoutes)



app.listen(PORT, () => {
    console.log(`Hello, Server is listening on port ${PORT}`);
})