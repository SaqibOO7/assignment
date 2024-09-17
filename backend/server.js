import express from 'express'
import dotenv from 'dotenv';

import connectToMongoDB from './db/connectToMongoDb.js';
import userRoutes from './routes/user.routes.js';


const app = express();

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());

app.use('/api/v1/user', userRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Sever is running on port ${PORT}`)
})


