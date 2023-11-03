/* eslint-disable import/first */
import dotenv from 'dotenv';
import path from 'path';

import cors from 'cors';
import express from 'express';
dotenv.config({ path: path.join(process.cwd(), '.env') });

// Routes
import AuthRouter from './routes/auth';
import UserRouter from './routes/user';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/user', UserRouter);

// Healthy check
app.get('/', (_, res) => res.send('Welcome! Everything is working.'));
app.listen(process.env.PORT, () => {
  console.log(`Server up and running @ ${process.env.PORT}`);
});
