'use strict';
const Response = require('../../util/Response');
const { pgp, db } = require('../../util/database');

exports.create = (event, context, callback) => {

  const userId = event.requestContext.authorizer.principalId.userId;
  const { todo } = JSON.parse(event.body);

  db.none('INSERT INTO todo_list(todo, user_id) VALUES($1::character varying, $2::int)', [todo, userId])
    .then(data => {
      callback(null, new Response(200));
    }).catch(error => {
      callback(error);
    }).finally(() => {
      pgp.end();
    });
};
