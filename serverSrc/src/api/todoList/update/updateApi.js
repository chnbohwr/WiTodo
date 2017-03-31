'use strict';
const { pgp, db } = require('../../../util/database');
const updateService = require('./updateService');

exports.update = (event, context, callback) => {
  const { userId } = event.requestContext.authorizer;
  const { todoId, todo } = JSON.parse(event.body);
  updateService({ todoId, todo, userId, callback, pgp, db });
};
