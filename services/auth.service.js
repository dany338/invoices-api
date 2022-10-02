const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const UserService = require('../services/users.service');

const service = new UserService();

class AuthService {
  constructor() {}

  async validatePassword(password, hash) {
    const rta = await service.validatePassword(password, hash);
    return rta;
  }

  async login(data) {
    const user = await models.User.findOne({
      where: {
        email: data.email,
      },
      include: [
        {
          model: models.Cashier,
          as: 'cashier',
          attributes: ['id', 'code', 'firstName', 'lastName'],
        },
      ],
    });
    if (!user) {
      throw boom.unauthorized('email or password invalid!');
    }
    const validPassword = await this.validatePassword(data.password, user.password);
    if (!validPassword) {
      throw boom.unauthorized('email or password invalid!!');
    }
    return user;
  }
}

module.exports = AuthService;
