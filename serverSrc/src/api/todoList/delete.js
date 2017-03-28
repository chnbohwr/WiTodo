'use strict';
const promise = require('bluebird');

const options = {
    promiseLib: promise // overriding the default (ES6 Promise);
};

const pgp = require('pg-promise')(options);

const Response = require('../../Response');

exports.delete = (event, context, callback) => {
  const bodyData = JSON.parse(event.body);

  const userId = 1;//bodyData.userId;
  const todoId = bodyData.todoId;

  const db = pgp(process.env.RDS_URL);

  db.none('DELETE FROM todo_list WHERE todo_id = $1 AND user_id = $2', [todoId, userId])
    .then(data => {
        callback(null, new Response(200));
    })
    .catch(error => {
        callback(error);
    })
    .finally(() => {
        pgp.end();
    });
};
