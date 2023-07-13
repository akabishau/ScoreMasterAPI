const express = require('express')
const router = express.Router()

const users = require('../src/data/users.json').users


router.get('/', (req, res) => {
    console.log('/api/v1/users')
    res.json(users)
})

router.get('/:id', (req, res) => {
    console.log('/api/v1/users/:id')
    const id = parseInt(req.params.id)
    const user = users.find(user => user.id === id)
    if (!user) {
        return res.status(404).json({ error: 'User not found'})
    } else {
        res.json(user)
    }
})


router.post('/', (req, res) => {
    console.log('/api/v1/users')
    const newUser = req.body
    newUser.id = users.length + 1
    users.push(newUser)
    res.status(201).json(newUser)
})


module.exports = router