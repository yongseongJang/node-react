const winston = require('winston');

const level = process.env.LOG_LEVEL || 'debug';

const logger = new winston.createLogger({
  transports: [
    new winston.transports.Console({
      level,
      timestamp: () => {
        return new Data().toISOString();
      },
    }),
  ],
});

module.exports = logger;
