const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { handleError } = require('../utils/error');

const morgan = require('morgan');
const logger = require('../utils/logger');

exports.expressLoader = app => {
  app.use(express.static(path.join(__dirname, './../../dist')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    morgan('common', {
      skip: (req, res) => {
        return res.statusCode >= 400;
      },
      stream: process.stdout,
    }),
  );

  app.use(
    morgan('common', {
      skip: (req, res) => {
        return res.statusCode < 400;
      },
      stream: process.stderr,
    }),
  );

  require('../routes')(app);

  app.use((err, req, res, next) => {
    logger.error(err);
    next(err);
  });

  app.use((err, req, res, next) => {
    handleError(err, res);
  });
};
