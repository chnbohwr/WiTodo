'use strict';
const { pgp, db } = require('../../../util/database');
const createService = require('./createService');

exports.create = (event, context, callback) => {
  const { userId } = event.requestContext.authorizer;
  const { todo } = JSON.parse(event.body);
  createService({userId, todo, callback, pgp, db});
};
