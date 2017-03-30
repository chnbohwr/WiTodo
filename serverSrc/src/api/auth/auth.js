'use strict';

const jwt = require('jsonwebtoken');

const generatePolicy = (userId, effect, resource) => ({
  principalId: { userId, resource},
  policyDocument: {
    Version: '2012-10-17',
    Statement: [{
      Action: 'execute-api:Invoke',
      Effect: effect,
      Resource: resource,
    }],
  }
});

exports.auth = (event, context, callback) => {
  const token = event.authorizationToken;
  
  let decodeResult = {};
  
  try{
    decodeResult = jwt.decode(token, process.env.JWT_SECRET);
  } catch(e){
    callback('Unauthorized');
  }
  
  const { userId, roleId } = decodeResult;

  // In this example, the token is treated as the status for simplicity.
  switch (roleId) {
    case 0:
      callback(null, generatePolicy(userId, 'Allow', event.methodArn));
      break;
    case 1:
      callback(null, generatePolicy(userId, 'Deny', event.methodArn));
      break;
    default:
      callback('Unauthorized');
  }
}
