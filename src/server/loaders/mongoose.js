require('dotenv').config();
const mongoose = require('mongoose');
const async = require('async');

exports.mongooseLoader = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: true,
    })
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));

  mongoose.connection.on('error', err => {
    console.error(err);
  });
};
