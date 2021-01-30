import {expect} from 'chai';
// import sinon from 'sinon';
// import {marbles} from 'rxjs-marbles/mocha';

import index from './index';

describe('index', () => {
  it ('should export API', () => {
    expect(index).to.be.a('function');
  });
});
