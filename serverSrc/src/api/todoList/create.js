'use strict';
const Response = require('../../Response');

exports.create = (event, context, callback) => {

  callback(null, new Response(200));
};
