const get = require('lodash/get');
const winston = require('winston');
const expressWinston = require('express-winston');
const { stringify } = require('flatted');
// require('winston-daily-rotate-file');

const {format} = winston;
const { combine, timestamp, json, prettyPrint } = format;
const { STAGE, SUPPRESS_LOGS, COMMIT_HASH } = process.env;

const metadata = {
  service: get(process.env, 'SERVICE_NAME', null),
  stage: get(process.env, 'STAGE', null),
  // sha: get(process.env, 'COMMIT_HASH', null),
};

// Parsing large log entries
const parseLog = size => info => {
  if (!info.data) return info;

  const slicedArr =
    info.data.length > size
      ? stringify(info.data).substring(0, size)
      : stringify(info.data);
  const stack = [];
  let openQuote = false;
  [...slicedArr].map(c => {
    if (c === '{' || c === '[' || c === '(') stack.push(c);
    if (c === '}' || c === ']' || c === ')') stack.pop();
    if (c === '"') openQuote = !openQuote;
    return c;
  });
  if (openQuote) slicedArr.push('"');

  const data =
    stack.length > 0
      ? stack.reduceRight(
          (acc, s) => {
            if (s === '{') acc.push('}');
            if (s === '(') acc.push(')');
            if (s === '[') acc.push(']');
            return acc;
          },
          [...slicedArr]
        )
      : slicedArr;
  return { ...info, data: JSON.parse(data) };
};

const options = {
  format: combine(
    // colorize(),
    format(info => (SUPPRESS_LOGS ? false : parseLog(300)(info)))(),
    timestamp(),
    json(),
    prettyPrint()
  ),
};

const infoTransport = new winston.transports.Console({
  name: 'info',
  level: 'info',
});

const debugTransport = new winston.transports.Console({
  name: 'debug',
  level: 'debug',
});

const transports = (
  process.env.STAGE === 'local'
  ? [debugTransport]
  : [infoTransport]
);

const winstonLogger = winston.createLogger({
  ...options,
  transports,
  exceptionHandlers: [new winston.transports.Console()],
});

const log = (level, message, data) => (SUPPRESS_LOGS ? false : winstonLogger[level](message, data));
const error = (message, data) => log('error', message, data);
const info = (message, data) => log('info', message, data);
const debug = (message, data) => log('debug', message, data);

const requestLogger = function requestLogger() {
  return expressWinston.logger({
    ...options,
    transports,
    baseMeta: metadata,
    requestWhitelist: ['body', 'query'],
    requestBlacklist: ['headers'],
    responseWhitelist: ['body'],
    headerBlacklist: ['Authorization'],
  });
};

// returns an express middleware, which logs requests
module.exports = {requestLogger, info, error, debug};
