const express = require('express')
const app = express()



app.get('/api/v1', (req, res) => {
    res.send('Welcome to ScoreMaster API')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})