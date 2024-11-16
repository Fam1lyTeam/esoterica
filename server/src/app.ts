import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { config } from './config';
import { checkDatabase } from './middlewares/checkDatabase';
import { checkTelegram } from './middlewares/checkTelegram';
import mainRouter from './routes/mainRouter';
import logger from './utils/logger';

const app = express();

app.use(express.json());

// CORS
const allowedOrigins = [config.clientUrl];
app.use(cors({
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  }
}));

if (process.env.NODE_ENV === 'production') {
  app.use(checkTelegram);
}

app.use(checkDatabase);

app.use('/', mainRouter);

app.use((req: Request, res: Response) => {
  res.sendStatus(404);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Unexpected error: %o', err);
  res.status(500).json({ message: 'Internal server error' });
});


process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection:', reason);
  process.exit(1);
});

export default app;
