'use strict';
const jwt = require('jsonwebtoken');
const Response = require('../../util/Response');
const { pgp, db } = require('../../util/database');

exports.create = (event, context, callback) => {
  const { userId } = jwt.decode(event.requestContext.authorizer.principalId, process.env.JWT_SECRET);
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
