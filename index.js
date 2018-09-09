const
    express = require("express"),
    path = require('path'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport');
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

// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', user);

app.get("/", (req, res) => {
    res.send('Invalid Endpoint');
})

app.listen(port, () => {
    console.log('Server started on port: ', port)
})