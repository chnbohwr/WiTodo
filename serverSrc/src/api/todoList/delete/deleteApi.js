'use strict';
const { pgp, db } = require('../../../util/database');
const Response = require('../../../util/Response');

exports.delete = (event, context, callback) => {
  const { userId } = event.requestContext.authorizer;
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
