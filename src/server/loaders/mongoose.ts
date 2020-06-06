import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import logger from '../utils/logger';

dotenv.config();

class MongooseLoader {
  constructor() {}

  public async init() {
    await mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: true,
      })
      .then(() => logger.log('info', 'Successfully connected to mongodb'))
      .catch((e: Error) => logger.error(e));

    mongoose.connection.on('error', err => {
      logger.error(err);
    });
  }
}

export default MongooseLoader;
