const mongoose = require('mongoose')
const Schema = mongoose.Schema

var voteSchema = new Schema({
    vote_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vote: {
        type: Number,
        enum: [1, -1]
    }
})

module.exports = voteSchema