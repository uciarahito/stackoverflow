const mongoose = require('mongoose')
const Schema = mongoose.Schema
const answerSchema = require('./answer')
const voteSchema = require('./vote')

var questionSchema = new Schema({
    title: String,
    content: String,
    ask_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    answers: [answerSchema],
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

var Question = mongoose.model('Question', questionSchema)

module.exports = Question