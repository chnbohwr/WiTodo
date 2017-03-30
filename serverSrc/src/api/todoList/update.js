'use strict';
const jwt = require('jsonwebtoken');
const { pgp, db } = require('../../util/database');
const Response = require('../../util/Response');

exports.update = (event, context, callback) => {
  const { userId } = jwt.decode(event.requestContext.authorizer.principalId, process.env.JWT_SECRET);
  const { todoId, todo } = JSON.parse(event.body);

  db.none('UPDATE todo_list SET todo = $1 WHERE todo_id = $2 AND user_id = $3', [todo, todoId, userId])
    .then(data => {
      callback(null, new Response(200));
    }).catch(error => {
      callback(error);
    }).finally(() => {
      pgp.end();
    });
};
