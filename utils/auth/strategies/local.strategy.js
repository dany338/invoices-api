const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');

const AuthService = require('../../../services/auth.service');
const service = new AuthService();

const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
    try {
      const user = await service.findByEmail(email);
      if (!user) {
        return done(boom.unauthorized(), false);
      }
      const isMatch = await service.validatePassword(password, user.password);
      if (!isMatch) {
        return done(boom.unauthorized(), false);
      }
      delete user.dataValues.password;
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;
