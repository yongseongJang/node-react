require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const bodyParser = require('body-parser');

const { handleError } = require('./utils/error');

const app = express();

app.use(express.static(path.join(__dirname, './../../dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
  })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

mongoose.connection.on('error', err => {
  console.error(e);
});

require('./routes')(app);

app.use((err, req, res, next) => {
  console.error(err);
  next(err);
});

app.use((err, req, res, next) => {
  handleError(err, res);
});

const port = process.env.PORT;

var fork = function() {
  app.listen(port, () =>
    console.log('Express server listening on port ' + port),
  );
};

fork();
