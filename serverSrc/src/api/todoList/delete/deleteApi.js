const { pgp, db } = require('../../../util/database');
const deleteService = require('./deleteService');

exports.delete = (event, context, callback) => {
  const { userId } = event.requestContext.authorizer;
  const { todoId } = JSON.parse(event.body);

  deleteService({ userId, todoId, callback, pgp, db });
};
