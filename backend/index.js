import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

await mongoose.connect(process.env.MONGO_URI);
console.log(Date(), ' : MongoDB Connected!');

app.use('/api/users', userRouter);

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});