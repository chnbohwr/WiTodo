module.exports = class Response {
  constructor(statusCode = 200, body = []) {
    return {
      statusCode,
      body: JSON.stringify(body),
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      },
    };
  }
};
