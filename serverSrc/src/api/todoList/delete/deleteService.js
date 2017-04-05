const Response = require('../../../util/Response');

const deleteService = ({ userId, todoId, callback, pgp, db }) => {
  if (!userId || !todoId || !callback || !pgp || !db || !Response) {
    callback(new Error('miss argument'));
  }

  db.none('DELETE FROM todo_list WHERE todo_id = $1 AND user_id = $2', [todoId, userId])
    .then((data) => {
      callback(null, new Response(200));
    }).catch((error) => {
      callback(error);
    }).finally(() => {
      pgp.end();
    });
};

module.exports = deleteService;
