const
    express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    jwt = require('jsonwebtoken');

const
    User = require('../models/user'),
    config = require('../config/database');

router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.send({
                success: false,
                msg: 'REGISTRATION FAILED !'
            })
        } else {
            res.send({
                success: true,
                msg: 'SUCCESSFULLY REGISTERED'
            })
        }
    })
})

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByName(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false,
                msg: 'User Not Found!'
            })
        }

        User.checkPassword(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 3600 * 24 * 7
                });

                res.json({
                    success: true,
                    token: token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                })
            } else {
                return res.json({
                    success: false,
                    msg: 'Password Mismatch!'
                })
            }
        })
    })

})

router.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    res.json({
        user: req.user
    })
})

module.exports = router;