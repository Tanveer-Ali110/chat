import mongoose from 'mongoose';
import { MONGODB_URI } from './environment';

async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable.');
  }

  if (mongoose.connection.readyState === 1) {
    // A connection is already established, return it
    return mongoose.connection;
  }

  try {
    const opts = {
      // Consider whether you really want to set bufferCommands to false
      bufferCommands: true,
    };

    await mongoose.connect(MONGODB_URI, opts);
    return mongoose.connection;
  } catch (e) {
    throw e;
  }
}

async function dbDisconnect() {
  if (mongoose.connection.readyState === 1) {
    mongoose.disconnect();
  }
}

export { dbConnect, dbDisconnect };
