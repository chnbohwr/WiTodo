const Response = require('../../../util/Response');

const updateService = ({ todoId, todo, userId, callback, pgp, db }) => {
  if (!todoId || !todo || !userId || !callback || !pgp || !db || !Response) {
    callback(new Error('miss argument'));
  }

  db.none('UPDATE todo_list SET todo = $1 WHERE todo_id = $2 AND user_id = $3', [todo, todoId, userId])
    .then((data) => {
      callback(null, new Response(200));
    }).catch((error) => {
      callback(error);
    }).finally(() => {
      pgp.end();
    });
};

module.exports = updateService;
