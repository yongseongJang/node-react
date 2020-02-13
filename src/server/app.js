require('dotenv').config();

const express = require('express');
const { loaders } = require('./loaders');
const async = require('async');

const port = process.env.PORT;

const fork = async () => {
  const app = express();

  await loaders(app);

  app.listen(port, () =>
    console.log('Express server listening on port ' + port),
  );
};

fork();
