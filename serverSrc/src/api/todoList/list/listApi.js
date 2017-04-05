const { pgp, db } = require('../../../util/database');
const listService = require('./listService');

exports.list = (event, context, callback) => {
  const { userId } = event.requestContext.authorizer;

  listService({ userId, callback, pgp, db });
};
