import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongodb = new MongoMemoryServer();

const connect = async () => {
  const uri = await mongodb.getConnectionString();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
  };

  await mongoose.connect(uri, mongooseOpts);
};

const close = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongodb.stop();
};

const clear = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

export const mongod = {
  connect,
  close,
  clear,
};
