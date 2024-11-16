import { Request, Response, NextFunction } from 'express';

export const checkTelegram = (req: Request, res: Response, next: NextFunction) => {
  const userAgent = req.headers['user-agent'] || '';
  const referer = req.headers['referer'] || '';

  if (userAgent.includes('Telegram') || referer.includes('t.me')) {
    next();
  } else {
    res.status(403).send('This app is only available on Telegram');
  }
};
