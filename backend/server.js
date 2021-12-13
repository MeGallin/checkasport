import express from 'express';
import cors from 'cors';

import contactFormRoutes from './routes/contactFormRoutes.js';

const app = express();
app.get('/', (req, res) => {
  res.send('API is running');
});
app.use(cors());
app.use(express.json()); // This needed to accept json data

//Routes
app.use('/api/send', contactFormRoutes);

const PORT = 5000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
