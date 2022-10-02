const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ClientsService {
  constructor() {}

  async create(data) {
    const client = await models.Client.create(data);
    return client;
  }

  async find() {
    const clients = await models.Client.findAll({
      include: [
        {
          model: models.Invoice,
          as: 'invoices',
          attributes: ['id', 'date_invoice'],
          include: [
            {
              model: models.Line,
              as: 'lines',
              attributes: ['id', 'description', 'amount'],
            }
          ],
        },
      ],
      order: [
        ['id', 'DESC'],
      ]
    });
    return clients;
  }

  async findOne(id) {
    const client = await models.Client.findByPk(id, {
      include: [
        {
          model: models.Invoice,
          as: 'invoices',
          attributes: ['id', 'date_invoice'],
          include: [
            {
              model: models.Line,
              as: 'lines',
              attributes: ['id', 'description', 'amount'],
            }
          ],
        },
      ],
    });
    if (!client) {
      throw boom.notFound('client not found');
    }
    return client;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = ClientsService;
