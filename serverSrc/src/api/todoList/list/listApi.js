'use strict';
const { pgp, db } = require('../../../util/database');
const Response = require('../../../util/Response');

exports.list = (event, context, callback) => {
  const { userId } = event.requestContext.authorizer;

  db.any('SELECT * FROM todo_list WHERE user_id = $1', [userId])
    .then(data => {
      callback(null, new Response(200, data));
    }).catch(error => {
      callback(error);
    }).finally(() => {
      pgp.end();
    });
};
