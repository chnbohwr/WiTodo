'use strict';

const jwt = require('jsonwebtoken');

const generatePolicy = (principalId, effect, resource) => ({
  principalId,
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
  console.log(token)

  var { userId, roleId } = jwt.decode(token, process.env.JWT_SECRET);
  console.log(userId);

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
