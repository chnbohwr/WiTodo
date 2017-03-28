'use strict';
const promise = require('bluebird');

const options = {
    promiseLib: promise // overriding the default (ES6 Promise);
};

const pgp = require('pg-promise')(options);

const Response = require('../../Response');

exports.update = (event, context, callback) => {
  const bodyData = JSON.parse(event.body);

  const userId = 1;//bodyData.userId;
  const todoId = bodyData.todo.todoId;
  const todo = bodyData.todo.todo;

  const db = pgp(process.env.RDS_URL);

  db.none('UPDATE todo_list SET todo = $1 WHERE todo_id = $2 AND user_id = $3', [todo, todoId, userId])
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
