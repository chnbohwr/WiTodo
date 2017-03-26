'use strict';
const Response = require('../../Response');

const todos = [
  {
    todoId: 0,
    todo: '制定API'
  }, {
    todoId: 1,
    todo: 'serverless 初始架構'
  }
];

exports.list = (event, context, callback) => {

  callback(null, new Response(200, todos));
};
