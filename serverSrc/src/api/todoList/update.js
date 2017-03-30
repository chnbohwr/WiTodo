'use strict';
const { pgp, db } = require('../../util/database');
const Response = require('../../util/Response');

exports.update = (event, context, callback) => {
  const userId = event.requestContext.authorizer.principalId;
  const { todoId, todo } = JSON.parse(event.body).todo;

  db.none('UPDATE todo_list SET todo = $1 WHERE todo_id = $2 AND user_id = $3', [todo, todoId, userId])
    .then(data => {
      callback(null, new Response(200));
    }).catch(error => {
      callback(error);
    }).finally(() => {
      pgp.end();
    });
};
