const { assert, expect } = require('chai');
const sinon = require('sinon');
const sinonPromise = require('sinon-promise');
const createService = require('./createService');

sinonPromise(sinon);

const testData1 = {
  userId: 123,
  callback: sinon.spy(),
  pgp: { end: sinon.spy() },
  db: { none: sinon.promise() },
};

const testData2 = {
  userId: 123,
  todo: '456',
  callback: sinon.spy(),
  pgp: { end: sinon.spy() },
  db: { none: sinon.promise() },
};

const testData3 = {
  userId: 123,
  todo: '456',
  callback: sinon.spy(),
  pgp: { end: sinon.spy() },
  db: { none: sinon.promise() },
};

describe('createService', () => {
  it('should return error', () => {
    createService(testData1);
    expect(testData1.callback.called).to.be.true;
    expect(testData1.callback.getCall(0).args[0] instanceof Error).to.be.true;
  });

  it('simulate database reject event', () => {
    createService(testData2);
    testData2.db.none.reject(new Error());
    expect(testData2.callback.called).to.be.true;
    expect(testData2.callback.getCall(0).args[0] instanceof Error).to.be.true;
  });

  it('simulate database resolve event', () => {
    createService(testData3);
    testData3.db.none.resolve({});
    expect(testData3.callback.called).to.be.true;
    expect(testData3.callback.getCall(0).args[1].statusCode).to.equal(200);
  });
});
