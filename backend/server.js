import express from 'express';
import cors from 'cors';

import contactFormRoutes from './routes/contactFormRoutes.js';
import servicesRoutes from './routes/servicesRoutes.js';

const app = express();
app.get('/', (req, res) => {
  res.send('API is running');
});
app.use(cors());
app.use(express.json()); // This needed to accept json data

//Routes
app.use('/', contactFormRoutes);
app.use('/', servicesRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
