const assert = require('chai').assert;
const sinon = require('sinon');
const sinonPromise = require('sinon-promise');
const updateService = require('./updateService');
sinonPromise(sinon);

const testData1 = { 
  todoId: 123, 
  userId: 456,
  callback: sinon.spy(),
  pgp:{ end: sinon.spy() },
  db: { none: sinon.promise()}
};


describe('updateService', () => {
  it('should return error', () => {
    updateService(testData1);
    assert.equal(testData1.callback.called, true);
  });
});