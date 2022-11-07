const logger = require('./internals/logger');
const toLog = require('./operators/toLog');
const trace = require('./operators/trace');

const api = {
  ...logger,
  toLog,
  trace
};

module.exports = api;
