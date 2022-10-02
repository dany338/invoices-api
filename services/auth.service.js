const bcrypt = require('bcrypt');
const { models } = require('../libs/sequelize');

class AuthService {
  constructor() {}

  async validatePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }

  async findByEmail(email) {
    const user = await models.User.findOne({
      attributes: ['id', 'email', 'role', 'createdAt'],
      where: {
        email,
      },
      include: [
        {
          model: models.Cashier,
          as: 'cashier',
          attributes: ['id', 'code', 'firstName', 'lastName'],
        },
      ],
    });
    return user;
  }
}

module.exports = AuthService;
