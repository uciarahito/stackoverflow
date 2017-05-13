const mongoose = require('mongoose')
const Schema = mongoose.Schema
const answerSchema = require('./answer')

var questionSchema = new Schema({
    title: String,
    content: String,
    ask_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    answer: [answerSchema],
    upvote: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvote: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
})

var Question = mongoose.model('Question', questionSchema)

module.exports = Question