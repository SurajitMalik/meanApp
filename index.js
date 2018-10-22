const
    express = require("express"),
    path = require('path'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    config = require('./config/database');

const
    app = express(),
    port = 3003;

const
    user = require('./routes/user');

mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('Connected to database', config.database)
})
mongoose.connection.on('error', (error) => {
    console.log('Database connection error', error)
})

app.use(cors());
app.use(bodyParser.json());

/**
 * PASSPORT MIDDLEWARE
 * Passport will maintain persistent login sessions. 
 * In order for persistent sessions to work, the authenticated user must be serialized 
 * to the session, and deserialized when subsequent requests are made.
 */
app.use(passport.initialize()); //To use Passport in an Express or Connect-based application
app.use(passport.session());

require('./config/passport')(passport);

// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', user);

app.get("/", (req, res) => {
    res.send('Invalid Endpoint');
})

app.listen(port, () => {
    console.log('Server started on port: ', port)
})