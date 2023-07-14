const express = require('express')
require('dotenv').config()

const app = express()

app.use(express.json())

app.get('/api/v1', (req, res) => {
    console.log('/api/v1')
    res.send('Welcome to ScoreMaster API')
})

// routes
const router = require('./routes')
app.use('/api/v1', router)



const mongoose = require('mongoose')
const env = process.env.NODE_ENV || 'dev'
const dbConfig = require(`./db.${env}.js`)
console.log(dbConfig)

mongoose.connect(dbConfig.url, dbConfig.options)
  .then(() => {
    console.log(`Connected to ${env} database`);
  })
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1); // Exit the application if unable to connect to the database
  });


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})