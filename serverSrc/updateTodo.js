'use strict';

module.exports.updateTodo = (event, context, callback) => {
  const todo = enent.body.todo;
  const response = {
    statusCode: 200
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};