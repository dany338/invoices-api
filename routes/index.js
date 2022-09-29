const express = require('express');

const usersRouter = require('./users.router');
const clientsRouter = require('./clients.router');
const invoicesRouter = require('./invoices.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/clients', clientsRouter);
  router.use('/invoices', invoicesRouter);
}

module.exports = routerApi;