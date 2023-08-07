import mongoose from 'mongoose'
import { config } from './config'
import app from './app'

const port = config.server.port

mongoose
  .connect(config.mongo.url, {
    retryWrites: true,
    w: 'majority'
  })
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`)
    })
  })
  .catch(err => {
    console.log('Failed to connect to MongoDB', err.message)
    process.exit(1)
  })
