import { Request, Response } from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../../public/App';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import { routes, IRoutes } from '../../public/utils/routes';
import configureStore from '../utils/store';
import renderer from '../utils/renderer';
import Helmet from 'react-helmet';

const ssr = (req: Request, res: Response) => {
  const context = {};
  const store = configureStore();
  const dataRequirements = routes
    .filter((route: IRoutes) => matchPath(req.path, route))
    .map((route: IRoutes) => route.component)
    .filter(comp => comp.serverFetch)
    .map(comp => {
      if (comp.serverFetch !== null) {
        const { type, payload } = comp.serverFetch;
        return store.dispatch({ type, payload });
      }
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
};

export default ssr;
