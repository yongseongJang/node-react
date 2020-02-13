const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { handleError } = require('../utils/error');

exports.expressLoader = app => {
  app.use(express.static(path.join(__dirname, './../../dist')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  require('../routes')(app);

  app.use((err, req, res, next) => {
    console.error(err);
    next(err);
  });

  app.use((err, req, res, next) => {
    handleError(err, res);
  });
};
