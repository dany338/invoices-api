const boom = require('@hapi/boom');

class InvoicesService {
  constructor() {}

  async create(data) {
    const invoice = await
    return invoice;
  }

  async find() {
    const invoices = await
    return invoices;
  }

  async findOne(id) {
    const invoice = await
    if (!invoice) {
      throw boom.notFound('invoice not found');
    }
    return invoice;
  }

  async update(id, changes) {
    const invoice = await
    return invoice;
  }

  async delete(id) {
    const invoice = await
    return invoice;
  }
}

module.exports = InvoicesService;
