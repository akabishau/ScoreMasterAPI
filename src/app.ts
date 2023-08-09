import express from 'express'
import cookerParser from 'cookie-parser'

import setupPassport from './lib/passport'
import router from './routes'
import errorMiddleware from './middleware/errorMiddleware'

const app = express()
app.use(express.json())
app.use(cookerParser()) // get accessToken from httpOnly cookie

const passport = setupPassport()
app.use(passport.initialize())

app.get('/api/v1', (req, res) => res.send('Welcome to ScoreMaster API'))
app.use('/api/v1', router)
app.use(errorMiddleware)

export default app
