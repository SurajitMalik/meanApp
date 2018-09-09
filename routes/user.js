const
    express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    jwt = require('jsonwebtoken');

const
    user = require('../models/user');

router.get('/register', (req, res, next) => {
    let newUser = new user({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    user.addUser(newUser, (err, res) => {
        if (err) {
            res.json({
                success: false,
                msg: 'REGISTRATION FAILED !'
            })
        } else {
            res.json({
                success: true,
                msg: 'SUCCESSFULLY REGISTERED'
            })
        }
    })
})

router.get('/authenticate', (req, res, next) => {
    res.send('AUTHENTICATION ROUTE !');
})

router.get('/profile', (req, res, next) => {
    res.send('PROFILE ROUTE !');
})

module.exports = router;