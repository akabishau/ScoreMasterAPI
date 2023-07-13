const express = require('express')
const app = express()

app.use(express.json())

app.get('/api/v1', (req, res) => {
    console.log('/api/v1')
    res.send('Welcome to ScoreMaster API')
})

// routes
const router = require('./src/routes')
app.use('/api/v1', router)



app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})