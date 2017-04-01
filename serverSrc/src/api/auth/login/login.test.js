const { expect } = require('chai');
const sinon = require('sinon');
const sinonPromise = require('sinon-promise');
const loginService = require('./loginService');

sinonPromise(sinon);

const testData1 = {
  callback: sinon.spy(),
  pgp: { end: sinon.spy() },
  db: { one: sinon.promise() }
};

const testData2 = {
  account: 'anonymous',
  password: '10000',
  callback: sinon.spy(),
  pgp: { end: sinon.spy() },
  db: { one: sinon.promise() }
};

const testData3 = {
  account: 'anonymous',
  password: 'errorPassword',
  callback: sinon.spy(),
  pgp: { end: sinon.spy() },
  db: { one: sinon.promise() }
};

const testData4 = {
  account: 'anonymous',
  password: 'correctPassword',
  callback: sinon.spy(),
  pgp: { end: sinon.spy() },
  db: { one: sinon.promise() }
};

describe('loginService', () => {

  it('should return no accounr or password', () => {
    loginService(testData1);
    expect(testData1.callback.called).to.be.true;
    expect(testData1.callback.getCall(0).args[1].statusCode).to.equal(400);
  });

  it('simulate database reject event', () => {
    loginService(testData2);
    expect(testData2.callback.called).to.be.false;
    testData2.db.one.reject(new Error());
    expect(testData2.callback.called).to.be.true;
    expect(testData2.callback.getCall(0).args[0] instanceof Error).to.be.true;
  });

  it('should return accounr or password error', () => {
    loginService(testData3);
    expect(testData3.callback.called).to.be.false;
    testData3.db.one.resolve({});
    expect(testData3.callback.called).to.be.true;
    expect(testData3.callback.getCall(0).args[1].statusCode).to.equal(400);
  });

  it('should return login tokenId', () => {
    loginService(testData4);
    expect(testData4.callback.called).to.be.false;
    testData4.db.one.resolve({ user_pw: 'correctPassword', role_id: '0', user_id: '1' });
    expect(testData4.callback.called).to.be.true;
    expect(testData4.callback.getCall(0).args[1].statusCode).to.equal(200);
  });
});

