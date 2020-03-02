const apiRouter = app => {
  app.use('/api/posts', require('./api/posts'));
  app.use('/api/users', require('./api/users'));
};

module.exports = apiRouter;
