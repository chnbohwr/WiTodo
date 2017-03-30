'use strict';
const Response = require('../../Response');
const { pgp, db } = require('../../util/database');

exports.create = (event, context, callback) => {
  const { todo } = JSON.parse(event.body);
  const userId = 1; //bodyData.userId;

  db.none('INSERT INTO todo_list(todo, user_id) VALUES($1::character varying, $2::int)', [todo, userId])
    .then(data => {
      callback(null, new Response(200));
    }).catch(error => {
      callback(error);
    }).finally(() => {
      pgp.end();
    });
};
