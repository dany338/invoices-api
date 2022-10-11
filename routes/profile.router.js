const express = require('express');
const passport = require('passport');

const InvoiceService = require('../services/invoices.service');

const router = express.Router();
const service = new InvoiceService();

router.get('/my-invoices',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const invoices = await service.findByUser(user.sub);
      res.json(invoices);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
