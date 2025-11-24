/**
 * Logger Utility
 * Production-safe logging with environment-based filtering
 */

const isDevelopment = __DEV__;

export const logger = {
  log: (...args) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  
  error: (message, error) => {
    if (isDevelopment) {
      console.error(message, error);
    }
    // In production, send to error tracking service (e.g., Sentry)
    // Sentry.captureException(error);
  },
  
  warn: (...args) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },
  
  info: (...args) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },
  
  debug: (...args) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  },
};

export default logger;
