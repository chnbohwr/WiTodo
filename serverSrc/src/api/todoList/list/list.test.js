const { assert, expect } = require('chai');
const sinon = require('sinon');
const sinonPromise = require('sinon-promise');
const listService = require('./listService');

sinonPromise(sinon);

const testData1 = {
  callback: sinon.spy(),
  pgp: { end: sinon.spy() },
  db: { any: sinon.promise()}
};

const testData2 = {
  userId: 4,
  callback: sinon.spy(),
  pgp: { end: sinon.spy() },
  db: { any: sinon.promise()}
};

const testData3 = {
  userId: 4,
  callback: sinon.spy(),
  pgp: { end: sinon.spy() },
  db: { any: sinon.promise()}
};

describe('listService', () => {
  it('should return error', () => {
    listService(testData1);
    expect(testData1.callback.called).to.be.true;
    expect(testData1.callback.getCall(0).args[0] instanceof Error).to.be.true;
  });

  it('simulate database reject event', () => {
    listService(testData2);
    expect(testData2.callback.called).to.be.false;
    testData2.db.any.reject(new Error());
    expect(testData2.callback.called).to.be.true;
    expect(testData2.callback.getCall(0).args[0] instanceof Error).to.be.true;
  });

  it('simulate database resolve event', () => {
    listService(testData3);
    expect(testData3.callback.called).to.be.false;
    testData3.db.any.resolve({});
    expect(testData3.callback.called).to.be.true;
    expect(testData3.callback.getCall(0).args[1].statusCode).to.equal(200);
  });
});
