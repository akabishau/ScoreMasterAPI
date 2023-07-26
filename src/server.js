const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(require('cookie-parser')()) // get accessToken from httpOnly cookie

// passport
const setupPassport = require('./lib/passport')
const passport = setupPassport() // returns passport; configure for different envoronments
app.use(passport.initialize())

// routes
app.get('/api/v1', (req, res) => res.send('Welcome to ScoreMaster API'))
const router = require('./routes')
app.use('/api/v1', router)

app.use(require('./middleware/error-handler'))

// db connection
const env = process.env.NODE_ENV || 'dev'
const port = process.env.PORT || 3000
const dbConfig = require(`./db.${env}.js`)

mongoose.connect(dbConfig.url, dbConfig.options)
  .then(() => {
    console.log(`Connected to ${env} database`)
    app.listen(port, () => console.log(`Server is up on port ${port}`))
  })
  .catch((err) => {
    console.error('Database connection error:', err)
    process.exit(1)
  })