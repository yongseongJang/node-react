const apiRouter = app => {
  app.use('/api/posts', require('./api/posts'));
};

module.exports = apiRouter;
