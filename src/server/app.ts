import * as dotenv from 'dotenv';
import * as express from 'express';
import Loader from './loaders';
import logger from './utils/logger';

dotenv.config();

const port = process.env.PORT;

const fork = async () => {
  const app = express();

  const loader = new Loader(app);
  await loader.config();

  app.listen(port, () => {
    logger.log('info', 'Express server listening on port ' + port);
  });
};

fork();
