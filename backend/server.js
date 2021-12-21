import express from 'express';
import connectDB from './config/bd.js';
import cors from 'cors';
import dotenv from 'dotenv';

import contactFormRoutes from './routes/contactFormRoutes.js';
import servicesRoutes from './routes/servicesRoutes.js';
import userRoutes from './routes/userRoutes.js';
import confirmEmailRoutes from './routes/confirmEmailRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();
const app = express();

app.get('/', (req, res) => {
  res.send('API is running');
});
app.use(cors());
app.use(express.json()); // This needed to accept json data

//Routes
app.use('/', confirmEmailRoutes);
app.use('/', contactFormRoutes);
app.use('/', servicesRoutes);
app.use('/', userRoutes);

// @Error handling middleware
app.use(notFound);
app.use(errorHandler);
// @Error handling middleware

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is running on port ${PORT} and you are running in ${process.env.NODE_ENV}`,
  ),
);
