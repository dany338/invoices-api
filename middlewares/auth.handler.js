const boom = require('@hapi/boom');
const { config } = require('../config/config');

function checkApiKey(req, res, next) {
  const apikey = req.headers['api'];
  if (apikey === config.apikey) {
    next();
  } else {
    next(boom.unauthorized('apikey is required'));
  }
}

module.exports = { checkApiKey };
