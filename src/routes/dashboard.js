const express = require('express')
const router = express.Router()


router.route('/').get((req, res) => {
    if (req.user) {
        console.log('dashboard')
        res.send(`Hi, ${req.user.name}! Welcome to ScoreMaster Dashboard`)
    } else {
        res.status(401).send('Unauthorized')
    }
    
})


module.exports = router