const { pgp, db } = require('../../../util/database');
const loginService = require('./loginService');

exports.login = (event, context, callback) => {
  const { account, password } = JSON.parse(event.body);
  loginService({ account, password, callback, pgp, db });
};

