import pino from 'pino';

export default pino({
  level: process.env.PINO_LOG_LEVEL || 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  redact: {
    paths: ['frc-captcha-solution','*.frc-captcha-solution'],
    censor: 'HIDDEN',
  }
});

