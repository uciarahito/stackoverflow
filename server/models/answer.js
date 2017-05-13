const mongoose = require('mongoose')
const Schema = mongoose.Schema
const voteSchema = require('./vote')

var answerSchema = new Schema({
    answer_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    votes: [voteSchema],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = answerSchema