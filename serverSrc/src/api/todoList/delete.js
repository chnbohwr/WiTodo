'use strict';
const Response = require('../../Response');

exports.delete = (event, context, callback) => {

  callback(null, new Response(200));
};
