const express = require('express')
const app = express()

const users = require('./src/data/users.json').users

app.use(express.json())



app.get('/api/v1', (req, res) => {
    console.log('/api/v1')
    res.send('Welcome to ScoreMaster API')
})

app.get('/api/v1/users', (req, res) => {
    console.log('/api/v1/users')
    console.log('users', typeof users, users)
    res.json(users)
})

app.get('/api/v1/users/:id', (req, res) => {
    console.log('/api/v1/users/:id')
    const id = parseInt(req.params.id)
    console.log(typeof id)
    console.log('id', id)
    const user = users.find(user => user.id === id)
    if (!user) {
        return res.status(404).json({ error: 'User not found'})
    } else {
        res.json(user)
    }
    console.log('user', user)
})


app.post('/api/v1/users', (req, res) => {
    console.log('/api/v1/users')
    console.log('req.body', req.body)
    const newUser = req.body

    newUser.id = users.length + 1

    users.push(newUser)
    res.status(201).json(newUser)
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})