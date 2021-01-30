const {expect} = require('chai');

const index = require('./index');

describe('index', () => {
  it('should export API', () => {
    expect(index.error).to.be.a('function');
    expect(index.info).to.be.a('function');
    expect(index.debug).to.be.a('function');
    expect(index.requestLogger).to.be.an('function');
  });
});
