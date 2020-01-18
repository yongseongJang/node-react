const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname, './../../dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));

//const apiRoutes = require('./src/server/routes/api');

//app.use('/api', apiRoutes);

const port = 9001;

var fork = function() {
  app.listen(port, () =>
    console.log('Express server listening on port ' + port),
  );
};

fork();

module.exports = {
  app,
};
