const express = require('express');

const AuthService = require('../services/auth.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { authSchema } = require('./../schemas/auth.schema');

const router = express.Router();
const service = new AuthService();

router.post('/',
  validatorHandler(authSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const response = await service.login(body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
