
const users = require('../data/users.json').users

const getUsers = async (req, res) => {
    console.log('getUsers')
    res.json(users)
}


const getUser = async (req, res) => {
    console.log(`getUser id: ${req.params.id}`)
    const id = parseInt(req.params.id)
    const user = users.find(user => user.id === id)
    if (!user) {
        return res.status(404).json({ error: 'User not found' })
    } else {
        res.json(user)
    }
}

const createUser = async (req, res) => {
    console.log('createUser')
    const newUser = req.body
    newUser.id = users.length + 1
    users.push(newUser)
    res.status(201).json(newUser)
}

module.exports = {
    getUsers,
    getUser,
    createUser
}