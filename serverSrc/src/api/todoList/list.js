'use strict';
const promise = require('bluebird'); 

const options = {
    promiseLib: promise // overriding the default (ES6 Promise);
};

const pgp = require('pg-promise')(options);

const Response = require('../../Response');

exports.list = (event, context, callback) => {
  //const bodyData = JSON.parse(event.body);
  
  const userId = 1; //bodyData.userId;

  const db = pgp(process.env.RDS_URL);

  db.any('SELECT * FROM todo_list WHERE user_id = $1', [userId])
    .then(data => {
        callback(null, new Response(200, data));
    })
    .catch(error => {
        callback(error); 
    })
    .finally(() => {
        pgp.end(); 
    });  
};
