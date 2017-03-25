'use strict';

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

  const response = {
    statusCode: 200,
    body: JSON.stringify(todos),
    headers: {
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
  };

  callback(null, response);
};