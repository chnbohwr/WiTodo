const { assert, expect } = require('chai');
const sinon = require('sinon');
const sinonPromise = require('sinon-promise');
const updateService = require('./updateService');

sinonPromise(sinon);

// miss some arg
const testData1 = {
  todoId: 123,
  userId: 456,
  callback: sinon.spy(),
  pgp: { end: sinon.spy() },
  db: { none: sinon.promise()}
};

const testData2 = {
  todoId: 123,
  userId: 456,
  todo: '18621561',
  callback: sinon.spy(),
  pgp: { end: sinon.spy() },
  db: { none: sinon.promise()}
};

const testData3 = {
  todoId: 123,
  userId: 456,
  todo: '18621561',
  callback: sinon.spy(),
  pgp: { end: sinon.spy() },
  db: { none: sinon.promise()}
};

describe('updateService', () => {
  it('should return error', () => {
    updateService(testData1);
    expect(testData1.callback.called).to.be.true;
    expect(testData1.callback.getCall(0).args[0] instanceof Error).to.be.true;
  });
  it('simulate database reject event', () => {
    updateService(testData2);
    expect(testData2.callback.called).to.be.false;
    testData2.db.none.reject(new Error());
    expect(testData2.callback.called).to.be.true;
    expect(testData2.callback.getCall(0).args[0] instanceof Error).to.be.true;
  });
  it('simulate database resolve event', () => {
    updateService(testData3);
    expect(testData3.callback.called).to.be.false;
    testData3.db.none.resolve({});
    expect(testData3.callback.called).to.be.true;
    expect(testData3.callback.getCall(0).args[1].statusCode).to.equal(200);
  });
});
