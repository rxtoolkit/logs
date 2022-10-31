const {expect} = require('chai');

const index = require('./index');

describe('index', () => {
  it('should export API', () => {
    expect(index.error).to.be.a('function');
    expect(index.info).to.be.a('function');
    expect(index.debug).to.be.a('function');
    expect(index.requestLogger).to.be.an('function');
  });

  it('should be able to call logging methods without throwing any errors', () => {
    index.error(new Error('foobar'), {foo: 'bar'});
    index.info('myevent', {foo: 'bar'});
    index.debug('myevent', {foo: 'bar'})
    index.requestLogger();
    expect(true).to.be.true;
  });
});
