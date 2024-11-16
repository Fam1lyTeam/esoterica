import { createLogger, format, transports, Logger } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

interface AppLogger extends Logger {
  logInfo: (message: string, meta?: Record<string, unknown>) => void;
  logError: (message: string, meta?: Record<string, unknown>) => void;
}

const logger: AppLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d'
    }),
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxFiles: '30d'
    })
  ],
}) as AppLogger;

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console());
}

logger.logInfo = (message: string, meta = {}) => {
  logger.info(message, { ...meta, service: 'custom-service' });
};

logger.logError = (message: string, meta = {}) => {
  logger.error(message, { ...meta, service: 'custom-service' });
};

export default logger;

