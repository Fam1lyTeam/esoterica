import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export const checkDatabase = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isDbConnected = true;

    if (!isDbConnected) {
      res.status(503).send('The service is temporarily unavailable');
    } else {
      next();
    }
  } catch (error) {
    logger.error('Database connection error: %o', error);
    res.status(503).send('The service is temporarily unavailable');
  }
};
