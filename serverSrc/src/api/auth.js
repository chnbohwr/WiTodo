'use strict';

const generatePolicy = (principalId, effect, resource) => ({
  principalId: principalId,
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
  /*
   *
   * extra custom authorization logic here: OAUTH, JWT ... etc
   *
   */
  let status = '';
  if (token === '123') {
    status = 'allow';
  } else if (token === '456') {
    status = 'deny';
  } else if (token === '789') {
    status = 'unauthorized';
  }

  // In this example, the token is treated as the status for simplicity.
  switch (status) {
    case 'allow':
      callback(null, generatePolicy('user', 'Allow', event.methodArn));
      break;
    case 'deny':
      callback(null, generatePolicy('user', 'Deny', event.methodArn));
      break;
    case 'unauthorized':
      callback('Unauthorized');
      break;
    default:
      callback('Error');
  }
}
