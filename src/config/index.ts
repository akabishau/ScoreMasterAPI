import dotenv from 'dotenv'
dotenv.config()

const MONGO_USERNAME = process.env.MONGO_USERNAME || ''
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || ''
const MONGO_HOST = process.env.MONGO_HOSTNAME || ''
const MONGO_DB = process.env.MONGO_DB || 'Development'
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}`

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 1137

export const config = {
  mongo: {
    url: MONGO_URL
  },
  server: {
    port: SERVER_PORT
  }
}
