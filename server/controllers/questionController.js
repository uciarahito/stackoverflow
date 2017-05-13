const mongo = require('mongodb')
const Question = require('../models/question')
const Helpers = require('../helpers/decodeToken')
var methods = {}

methods.getAll = (req, res) => {
    Question.find({}, (err, records) => {
        if (err) {
            console.log(err);
            res.json({
                err
            })
        }
        console.log(records);
        res.json(records)
    })
}

methods.getById = (req, res) => {
    Question.findById(req.params.id, (err, record) => {
        if (err) {
            console.log(err);
            res.json({
                err
            })
        }
        console.log(records);
        res.json(records)
    })
}

methods.insertOne = (req, res) => {
    let decoded = Helpers.decodeToken(req.headers.token);
    console.log(decoded._id);
    req.body.ask_by = decoded._id

    let question = req.body.ask_by
    question = decoded._id
    let newQuestion = new Question({
        title: req.body.title,
        content: req.body.content,
        ask_by: question,
        answer: [],
        upvote: [],
        downvote: []
    })
    newQuestion.save((err, record) => {
        if (err) {
            // console.log(err);
            res.json({
                err
            })
        }
        console.log('++++');
        console.log(typeof record);
        res.json(record)
    })
}

methods.updateById = (req, res, next) => {
    let decoded = Helpers.decodeToken(req.headers.token)
    // console.log(decoded);
    let question = req.body.ask_by
    question = decoded._id
    Question.findById(req.params.id)
        .then(record => {
            Question.updateOne({
                    "_id": new mongo.ObjectID(req.params.id)
                }, {
                    $set: {
                        "title": req.body.title || record.title,
                        "content": req.body.content || record.content,
                        "ask_by": question
                    }
                })
                .then((record) => {
                    console.log('ooooooo');
                    console.log(record);
                    res.json(record)
                })
                .catch(err => {
                    res.json({
                        err,
                        message: 'Error waktu update Question'
                    })
                })
        })
        .catch(err => {
            res.json({
                err,
                message: 'Data tidak ada'
            })
        })
} //updateById

methods.deleteById = (req, res) => {
    Question.findByIdAndRemove(req.params.id)
        .exec((err, record) => {
            if (err) {
                res.json({
                    err,
                    message: 'Error waktu deleteById'
                })
            } else {
                res.json(record)
            }
        })
} // deleteById

// NOTE: add answer

methods.createAnswer = (req, res) => {
    let decoded = Helpers.decodeToken(req.headers.token)
    // console.log(decoded);
    let answer = req.body.answer_by
    question = decoded._id
    Question.findByIdAndUpdate(req.params.id, {
            $push: {
                answer: {
                    answer_by: answer,
                    content: req.body.content
                }
            }
        }, {
            new: true
        })
        .exec((err, record) => {
            if (err) {
                res.send(err)
            } else {
                res.json(record)
            }
        })
}

// methods.editAnswer = (req, res) => {
//     Question.findById(req.params.id, (err, record) => {
//         // console.log(record.answer);
//         let dataAnswer = record.answer
//         Question.findByIdAndUpdate(dataAnswer.answer_by, (err, recordX) => {
//             console.log('******');
//             console.log(recordX);
//             res.json(recordX)
//         })
//
//     })
// }

methods.getAllAnswer = (req, res) => {
    Question.findById(req.params.id, (err, record) => {
        if (err) {
            res.json({
                err
            })
        }
        console.log(record.answer);
        res.json(record.answer)
    })
}

methods.getAnwerDetail = (req, res) => {
    Question.findById(req.params.id)
        .populate('answer')
        .then((record) => {
            // console.log(record);
            // res.json(record)
            let dataBaru = record.answer.filter(newData => {
                if (newData._id == req.params.anwserid) {
                    return newData
                }
            })
            res.send(dataBaru)

        })
}

module.exports = methods