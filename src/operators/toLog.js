const {tap} = require('rxjs/operators');

const logger = require('../internals/logger');

const toLog = (label = null, _logger = logger) => source$ => source$.pipe(
  tap(data => _logger.info(label, data))
);

module.exports = toLog;
