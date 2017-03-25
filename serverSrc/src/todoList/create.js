'use strict';

exports.create = (event, context, callback) => {

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
  };

  callback(null, response);
};