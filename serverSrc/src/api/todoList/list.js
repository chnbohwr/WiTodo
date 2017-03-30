'use strict';
const { pgp, db } = require('../../util/database');
const Response = require('../../Response');

exports.list = (event, context, callback) => {
  //const bodyData = JSON.parse(event.body);  
  const userId = 1; //bodyData.userId;

  db.any('SELECT * FROM todo_list WHERE user_id = $1', [userId])
    .then(data => {
      callback(null, new Response(200, data));
    }).catch(error => {
      callback(error);
    }).finally(() => {
      pgp.end();
    });
};
