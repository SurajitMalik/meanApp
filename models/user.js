const
    mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    config = require('../config/database');

const
    /**
     * salt round: cost factor. The cost factor controls how much time is needed to calculate 
     * a single BCrypt hash. The higher the cost factor, the more hashing rounds are done. 
     * Increasing te cost factor by 1 doubles the necessary time. The more time is necessary, 
     * the more difficult is brute-forcing.
     */
    salt_round = 10;

const
    userSchema = mongoose.Schema({
        name: {
            type: String
        },
        email: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    })

const
    user = module.exports = mongoose.model('user', userSchema);


module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(salt_round, (err, salt) => {
        if (!err) {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save(callback);
            })
        }
    })
}

module.exports.getUserById = function (id, callback) {
    user.findById(id, callback);
}

module.exports.getUserByName = function (username, callback) {
    const query = {
        username: username
    };
    user.findOne(query, callback);
}

module.exports.checkPassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    })
}