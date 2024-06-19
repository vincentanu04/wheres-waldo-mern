import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GameRouter, AccountRouter } from './routes';
import mongoose from 'mongoose';

const app: Express = express();
dotenv.config();

const PORT = process.env.PORT || 3001;

mongoose.set('strictQuery', false);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URI as string);
}

app.use(cors());
app.use(express.json());

app.use('/api/games', GameRouter);
app.use('/api/account', AccountRouter);

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ error: err.message });

  return;
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
