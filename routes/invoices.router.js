const express = require('express');

const InvoiceService = require('../services/invoices.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createSchema, updateSchema, getSchema } = require('./../schemas/invoice.schema');

const router = express.Router();
const service = new InvoiceService();

router.get('/',
  async (req, res, next) => {
    try {
      const invoices = await service.find();
      res.json(invoices);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id',
  validatorHandler(getSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const invoice = await service.findOne(id);
      res.json(invoice);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const invoice = await service.create(body);
      res.status(201).json(invoice);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getSchema, 'params'),
  validatorHandler(updateSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const invoice = await service.update(id, body);
      res.json(invoice);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
