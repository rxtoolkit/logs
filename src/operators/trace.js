const {throwError} = require('rxjs');
const {catchError} = require('rxjs/operators');

const logger = require('../internals/logger');

const trace = (_logger = logger) => source$ => source$.pipe(
  catchError(err => {
    _logger.error(err);
    return throwError(err);
  })
);

module.exports = trace;
