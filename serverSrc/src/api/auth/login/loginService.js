const Response = require('../../../util/Response');
const jwt = require('jsonwebtoken');

const expireTime = 60 * 60;

const createToken = (userId, roleId) => jwt.sign({ userId, roleId }, process.env.JWT_SECRET, { expiresIn: expireTime });

const checkLoginInfo = (password, dbInfo, callback) => {

  const { user_pw: userPw, role_id: roleId, user_id: userId } = dbInfo;

  if (password !== userPw) {
    callback(null, new Response(400, { message: 'Account or Password Error!' }));
  } else {
    const tokenId = createToken(userId, roleId);
    callback(null, new Response(200, { tokenId }));
  }

};

const loginService = ({ account, password, callback, pgp, db }) => {

  if (!account || !password) {
    callback(null, new Response(400, { message: 'You must send the account and the password' }));
  }

  db.one('SELECT * FROM wi_user WHERE user_name = $1', [account])
    .then((data) => {
      checkLoginInfo(password, data, callback);
    })
    .catch((error) => {
      callback(error);
    })
    .finally(() => {
      pgp.end();
    });

};

module.exports = loginService;
