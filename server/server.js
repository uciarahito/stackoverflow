const express = require('express')
const passport = require('passport')
const Strategy = require('passport-local').Strategy
const app = express()
const bodyParser = require('body-parser')
const index = require('./routes/index')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
var cors = require('cors')
var userController = require('./controllers/userController')

app.use(cors())

passport.use(new Strategy(userController.signin));

mongoose.connect('mongodb://localhost/stackoverflow')

// NOTE: set
app.set('port', process.env.PORT || 3000)

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

app.use(passport.initialize());

app.use('/', index)

app.listen(app.get('port'), function() {
    console.log('Listening on port 3000');
})