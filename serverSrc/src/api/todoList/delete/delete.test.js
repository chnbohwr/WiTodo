const { assert, expect } = require('chai');
const sinon = require('sinon');
const sinonPromise = require('sinon-promise');
const deleteService = require('./deleteService');

sinonPromise(sinon);

const testData1 = {
  todoId: 1,
  callback: sinon.spy(),
  pgp: { end: sinon.spy() },
  db: { none: sinon.promise()}
};

const testData2 = {
  todoId: 1,
  userId: 4,
  callback: sinon.spy(),
  pgp: { end: sinon.spy() },
  db: { none: sinon.promise()}
};

const testData3 = {
  todoId: 1,
  userId: 4,
  callback: sinon.spy(),
  pgp: { end: sinon.spy() },
  db: { none: sinon.promise()}
};

describe('deleteService', () => {
  it('should return error', () => {
    deleteService(testData1);
    expect(testData1.callback.called).to.be.true;
    expect(testData1.callback.getCall(0).args[0] instanceof Error).to.be.true;
  });

  it('simulate database reject event', () => {
    deleteService(testData2);
    expect(testData2.callback.called).to.be.false;
    testData2.db.none.reject(new Error());
    expect(testData2.callback.called).to.be.true;
    expect(testData2.callback.getCall(0).args[0] instanceof Error).to.be.true;
  });

  it('simulate database resolve event', () => {
    deleteService(testData3);
    expect(testData3.callback.called).to.be.false;
    testData3.db.none.resolve({});
    expect(testData3.callback.called).to.be.true;
    expect(testData3.callback.getCall(0).args[1].statusCode).to.equal(200);
  });
});
