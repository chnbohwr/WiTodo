'use strict';
const jwt = require('jsonwebtoken');
const { pgp, db } = require('../../util/database');
const Response = require('../../util/Response');

exports.delete = (event, context, callback) => {
  const { userId } = jwt.decode(event.requestContext.authorizer.principalId, process.env.JWT_SECRET);
  const { todoId } = JSON.parse(event.body);

  db.none('DELETE FROM todo_list WHERE todo_id = $1 AND user_id = $2', [todoId, userId])
    .then(data => {
      callback(null, new Response(200));
    }).catch(error => {
      callback(error);
    }).finally(() => {
      pgp.end();
    });
};
