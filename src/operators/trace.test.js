const {expect} = require('chai');
const sinon = require('sinon');
const {marbles} = require('rxjs-marbles/mocha');
const {throwError} = require('rxjs');

const trace = require('./trace');

describe('trace', () => {
  it('should export a function', () => {
    expect(trace).to.be.a('function');
  });

  it('should not alter source observable', marbles(m => {
    const _logger = {error: sinon.spy()};
    const input$ = m.cold('--0---1|', ['foo', 'bar']);
    const actual$ = input$.pipe(trace(_logger));
    m.expect(actual$).toBeObservable(input$);
  }));

  it('should not alter source observable when error is thrown', marbles(m => {
    const _logger = {error: sinon.spy()};
    const err = new Error('zoinks');
    const input$ = m.cold('--0---1#', ['foo', 'bar'], err);
    const actual$ = input$.pipe(trace(_logger));
    m.expect(actual$).toBeObservable(input$);
  }));

  it('should call logger with errors', done => {
    const logger = {error: sinon.spy()};
    const onData = sinon.spy();
    const error = new Error('jeepers');
    const input$ = throwError(error);
    const actual$ = input$.pipe(trace(logger));
    actual$.subscribe(onData, () => {
      expect(logger.error.callCount).to.equal(1);
      expect(logger.error.getCall(0).args[0]).to.equal(error);
      done();
    });
  });
});
