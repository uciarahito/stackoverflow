// grab the thing we need
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
var userSchema = new Schema({
    name: String,
    username: {
        type: String,
        unique: true
    },
    password: String,
    email: String
})

var User = mongoose.model('User', userSchema)

module.exports = User