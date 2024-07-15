import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';

const app = express();
dotenv.config();

connectDB();


app.use(cors());
const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
    console.log(`Hello, Server is listening on port ${PORT}`);
})