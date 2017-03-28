'use strict';
const promise = require('bluebird'); 

const options = {
    promiseLib: promise // overriding the default (ES6 Promise);
};

const pgp = require('pg-promise')(options);

const Response = require('../../Response');
const cn = require('../../../config');

exports.update = (event, context, callback) => {
  //const bodyData = JSON.parse(event.body);

  const userId = 2;//bodyData.userId;
  const todoId = 4;//bodyData.todoId;
  const todo = '後端實做吧yayaya';//bodyData.todo;

  const db = pgp('postgres://' + cn.user + ':'+ cn.password +'@' + cn.host + ':5432/' + cn.database);   

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
