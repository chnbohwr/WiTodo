'use strict';
const promise = require('bluebird'); 

const options = {
    promiseLib: promise // overriding the default (ES6 Promise);
};

const pgp = require('pg-promise')(options);

const Response = require('../../Response');

exports.create = (event, context, callback) => {
  //const bodyData = JSON.parse(event.body);
  
  const userId = 1; //bodyData.userId;
  const todoText = '今天開出API 222'; //bodyData.todo;

  const db = pgp(process.env.RDS_URL);   

  db.none('INSERT INTO todo_list(todo, user_id) VALUES($1::character varying, $2::int)', [todoText, userId])
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
