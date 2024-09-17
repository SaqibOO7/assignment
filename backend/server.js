import path from 'path';
import express from 'express';
import dotenv from 'dotenv';

import connectToMongoDB from './db/connectToMongoDb.js';
import userRoutes from './routes/user.routes.js';


const app = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json());

app.use('/api/v1/user', userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Sever is running on port ${PORT}`)
})


