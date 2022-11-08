const {expect} = require('chai');
const sinon = require('sinon');
const {marbles} = require('rxjs-marbles/mocha');
const {of} = require('rxjs');

const toLog = require('./toLog');

describe('toLog', () => {
  it('should export a function', () => {
    expect(toLog).to.be.a('function');
  });

  it('should not alter source observable', marbles(m => {
    const _logger = {info: sinon.spy()};
    const input$ = m.cold('--0---1|', ['foo', 'bar']);
    const actual$ = input$.pipe(toLog(null, _logger));
    m.expect(actual$).toBeObservable(input$);
  }));

  it('should call logger with each item and label', done => {
    const logger = {info: sinon.spy()};
    const onData = sinon.spy();
    const data = [{data: 'foo'}, {data: 'bar'}];
    const input$ = of(...data);
    const actual$ = input$.pipe(toLog('verySpecialEvent', logger));
    actual$.subscribe(onData, console.error, () => {
      expect(logger.info.callCount).to.equal(2);
      expect(logger.info.getCall(1).args[0]).to.equal('verySpecialEvent');
      expect(logger.info.getCall(1).args[1]).to.equal(data[1]);
      done();
    });
  });


  it('should call logger with each item when no label is given', done => {
    const logger = {info: sinon.spy()};
    const onData = sinon.spy();
    const data = [{data: 'foo'}, {data: 'bar'}];
    const input$ = of(...data);
    const actual$ = input$.pipe(toLog(null, logger));
    actual$.subscribe(onData, console.error, () => {
      expect(logger.info.callCount).to.equal(2);
      expect(logger.info.getCall(1).args[0]).to.equal(null);
      expect(logger.info.getCall(1).args[1]).to.equal(data[1]);
      done();
    });
  });
});
