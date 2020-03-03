const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { handleError } = require('../utils/error');

const morgan = require('morgan');
const logger = require('../utils/logger');

const React = require('react');
const { renderToString } = require('react-dom/server');
const { default: App } = require('../../public/App.jsx');
const { StaticRouter, matchPath } = require('react-router-dom');
const { Provider } = require('react-redux');
const configureStore = require('../utils/store');
const { routes } = require('../../public/utils/routes');
const renderer = require('../utils/renderer');
const Helmet = require('react-helmet').default;

exports.expressLoader = app => {
  app.use(express.static(path.join(__dirname, '../../../dist')));
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

  app.get('/*', (req, res) => {
    const context = {};
    const store = configureStore();
    const dataRequirements = routes
      .filter(route => matchPath(req.path, route))
      .map(route => route.component)
      .filter(comp => comp.serverFetch)
      .map(comp => {
        const { type, payload } = comp.serverFetch;
        return store.dispatch({ type, payload });
      });

    Promise.all(dataRequirements).then(() => {
      const jsx = (
        <Provider store={store}>
          <StaticRouter context={context} location={req.url}>
            <App />
          </StaticRouter>
        </Provider>
      );

      const reactDom = renderToString(jsx);
      const preloadedState = store.getState();
      const helmetData = Helmet.renderStatic();

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(renderer(reactDom, preloadedState, helmetData));
    });
  });

  app.use((err, req, res, next) => {
    logger.error(err);
    next(err);
  });

  app.use((err, req, res, next) => {
    handleError(err, res);
  });
};
