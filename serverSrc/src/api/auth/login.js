'use strict';

const jwt = require('jsonwebtoken');
const { pgp, db } = require('../../util/database');
const Response = require('../../util/Response');
const expireTime = 60*60;

const createToken = (userId, roleId) => jwt.sign({ userId, roleId }, process.env.JWT_SECRET, { expiresIn: expireTime });

const checkLoginInfo = (userInfo, dbInfo, callback) => {

  const { user_pw: password, role_id: roleId, user_id: userId } = dbInfo;

  if (userInfo.password !== password) {
    callback(null, new Response(400, "Account or Password Error!"));
  } else {
    const tokenId = createToken(userId, roleId);
    callback(null, new Response(200, {tokenId}));
  }

}

exports.login = (event, context, callback) => {

  const userInfo = JSON.parse(event.body);

  if (!userInfo.account || !userInfo.password) {
    callback(null, new Response(400, "You must send the account and the password"));
  }

  db.one('SELECT * FROM wi_user WHERE user_name = $1', [userInfo.account])
    .then(data => {
      checkLoginInfo(userInfo, data, callback);
    })
    .catch(error => {
      callback(error);
    })
    .finally(() => {
      pgp.end();
    });
};





