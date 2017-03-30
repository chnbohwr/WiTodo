'use strict';
const jwt = require('jsonwebtoken');
const { pgp, db } = require('../../util/database');
const Response = require('../../util/Response');

exports.list = (event, context, callback) => {
  console.log(event.requestContext.authorizer.principalId)
  const { userId } = jwt.decode(event.requestContext.authorizer.principalId, process.env.JWT_SECRET);

  db.any('SELECT * FROM todo_list WHERE user_id = $1', [userId])
    .then(data => {
      callback(null, new Response(200, data));
    }).catch(error => {
      callback(error);
    }).finally(() => {
      pgp.end();
    });
};
