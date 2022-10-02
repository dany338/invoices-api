const express = require('express');

const ClientService = require('../services/clients.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createSchema, updateSchema, getSchema } = require('./../schemas/invoice.schema');

const router = express.Router();
const service = new ClientService();

router.get('/',
  async (req, res, next) => {
    try {
      const clients = await service.find();
      res.json(clients);
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
      const client = await service.findOne(id);
      res.json(client);
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
      const client = await service.create(body);
      res.status(201).json(client);
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
      const client = await service.update(id, body);
      res.json(client);
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
