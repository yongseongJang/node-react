const { mongooseLoader } = require('./mongoose');
const { expressLoader } = require('./express');

exports.loaders = async app => {
  await mongooseLoader();
  await expressLoader(app);
};
