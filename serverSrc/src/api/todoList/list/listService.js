const Response = require('../../../util/Response');

const listService = ({ userId, callback, pgp, db }) => {
  if (!userId || !callback || !pgp || !db || !Response) {
    callback(new Error('miss argument'));
  }

  db.any('SELECT * FROM todo_list WHERE user_id = $1', [userId])
    .then((data) => {
      callback(null, new Response(200, data));
    }).catch((error) => {
      callback(error);
    }).finally(() => {
      pgp.end();
    });
};

module.exports = listService;
