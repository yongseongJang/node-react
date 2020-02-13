const { mongooseLoader } = require('./mongoose');
const { expressLoader } = require('./express');
const async = require('async');

exports.loaders = async app => {
  await mongooseLoader();
  await expressLoader(app);
};
