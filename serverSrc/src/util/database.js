const promise = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: promise });
const db = pgp(process.env.RDS_URL);
module.exports = { pgp, db };