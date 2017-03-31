const Response = require('../../../util/Response');

const createService = ({userId, todo, callback, pgp, db}) => {
  if (!userId || !todo || !callback || !pgp || !db || !Response) {
    callback(new Error('miss argument'));
  }

  db.none('INSERT INTO todo_list(todo, user_id) VALUES($1::character varying, $2::int)', [todo, userId])
    .then((data) => {
      callback(null, new Response(200));
    }).catch((error) => {
      callback(error);
    }).finally(() => {
      pgp.end();
    });
};

module.exports = createService;
