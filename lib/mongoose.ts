import mongoose, { Mongoose } from 'mongoose'
import logger from './logger'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined')
}

interface MongooseCache {
  conn: Mongoose | null
  promise: Promise<Mongoose> | null
}

declare global {
  var mongoose: MongooseCache | undefined
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  }
}

const dbConnect = async (): Promise<Mongoose> => {
  logger.info('🔥 dbConnect() CALLED')

  if (cached?.conn) {
    logger.info('🟢 Using existing MongoDB connection')
    return cached.conn
  }

  if (!cached?.promise) {
    logger.info('🟡 Connecting to MongoDB...')

    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: 'devflow',
      })
      .then((result) => {
        logger.info('🟢  Connected to MongoDB successfully')
        return result
      })
      .catch((error) => {
        logger.error({ err: error }, '🔴 MongoDB connection failed')
        throw error
      })
  }

  cached.conn = await cached.promise

  return cached.conn
}

export default dbConnect
