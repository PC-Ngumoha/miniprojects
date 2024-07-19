import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route';
import SecretRouter from './routes/secret.route';

const app = express();

app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/secrets', SecretRouter);

const PORT = process.env.PORT || 3000;

mongoose
  .connect('mongodb://127.0.0.1:27017/secretsDB')
  .then(() => {
    console.log('Success: Connected to DB !!!');
    app.listen(PORT, () => {
      console.log(`Server is up and running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log('Failed: Not connected to DB !!!');
  });
