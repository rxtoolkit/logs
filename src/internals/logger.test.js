const {expect} = require('chai');

const logger = require('./logger');

describe('logger', () => {
  it('should export API', () => {
    expect(logger.error).to.be.a('function');
    expect(logger.info).to.be.a('function');
    expect(logger.debug).to.be.a('function');
    expect(logger.requestLogger).to.be.an('function');
  });

  it('should be able to call logging methods without throwing any errors', () => {
    logger.error(new Error('foobar'), {foo: 'bar'});
    logger.info('myevent', {foo: 'bar'});
    logger.debug('myevent', {foo: 'bar'})
    logger.requestLogger();
    // the above commands should not throw
    expect(true).to.be.true;
  });
});
