const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class UsersService {
  constructor() {}

  async create(data) {
    // const user = await models.User.create(data);
    const user = await models.User.create(data, { include: ['cashier'] });
    // const cashier = await models.Cashier.create({ userId: user.id, code: data.code, firstName: data.firstName, lastName: data.lastName });
    // if (cashier) {
    //   user.cashier = cashier;
    // }
    return user;
  }

  async find() {
    const users = await models.User.findAll({
      include: [
        {
          model: models.Cashier,
          as: 'cashier',
          attributes: ['id', 'code', 'firstName', 'lastName'],
        },
      ],
      order: [
        ['id', 'DESC'],
      ]
    });
    return users;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id, {
      include: [
        {
          model: models.Cashier,
          as: 'cashier',
          attributes: ['id', 'code', 'firstName', 'lastName'],
        },
      ],
    });
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    let user = await this.findOne(id);
    const { cashier, ...newChanges } = changes;
    await user.update(newChanges);
    await user.cashier.update(cashier);
    user = await this.findOne(id);
    return user;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UsersService;
