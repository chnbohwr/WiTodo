'use strict';
const todos = [
  { 
    id: 0,
    todo: '吃早餐' 
  },{
    id: 1,
    todo: '看電視'
  }

]
module.exports.getTodo = (event, context, callback) => {
  //const todo = event.body.todo;
  const response = {
    statusCode: 200,
    body: JSON.stringify(todos)
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
