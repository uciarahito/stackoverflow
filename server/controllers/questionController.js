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
        answers: [],
        votes: []
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
                answers: {
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
        console.log(record.answers);
        res.json(record.answers)
    })
}

methods.getAnswerDetail = (req, res) => {
    Question.findById(req.params.id)
        .populate('answers')
        .then(record => {
            // console.log(record);
            // res.json(record)
            let dataBaru = record.answers.filter(newData => {
                if (newData._id == req.params.anwserid) {
                    return newData
                }
            })
            res.send(dataBaru)

        })
}

methods.voteToQuestion = (req, res) => {
    let decoded = Helpers.decodeToken(req.headers.token)
    Question.findById(req.params.id)
        .exec((err, record) => {
            if (err) {
                res.json({
                    err
                })
            } else {
                let exist = record.votes.some(val => {
                    return val.vote_by == decoded._id
                })

                if (exist) {
                    res.json({
                        check_vote: false,
                        message: "You have already voted"
                    })
                } else {
                    Question.findByIdAndUpdate(
                            record.id, {
                                $push: {
                                    votes: {
                                        voted_by: decoded._id,
                                        vote: req.body.vote
                                    }
                                }
                            }, {
                                new: true // biar data yg ditampilkan data yg terupdate
                            })
                        .exec(err => {
                            res.json({
                                check_vote: err == null ? true : false
                            })
                        })
                }
            }
        })
}

methods.voteToAnswer = (req, res) => {
    let decoded = Helpers.decodeToken(req.headers.token)
    Question.findById(req.params.id)
        .exec((err, record) => {
            if (err) {
                res.json({
                    err
                })
            } else {
                let index = record.answers.findIndex(val => val.id == req.params.answerid)
                // console.log(record.answers);
                // console.log(index);
                let exist = record.answers[index].votes.some(val => {
                    val.vote_by == decoded._id
                })
                // console.log(exist);

                if (exist) {
                    res.json({
                        check_vote: false,
                        message: "You have already voted"
                    })
                } else {
                    Question.findOneAndUpdate({
                            '_id': record.id,
                            'answers._id': req.params.answerid
                        }, {
                            $push: {
                                'answers.$.votes': {
                                    voted_by: decoded._id,
                                    vote: req.body.vote
                                }
                            }
                        }, {
                            new: true // biar data yg ditampilkan data yg terupdate
                        })
                        .exec(err => {
                            console.log(req.body.vote);
                            res.json({
                                check_vote: err == null ? true : false
                            })
                        })
                }
            }
        })
}

methods.deleteAnswer = (req, res) => {
    Question.findById(req.params.id)
        .populate('answers')
        .then(record => {
            let data = record.answers.filter(dataDelete => {
                dataDelete._id == req.params.answerid
                return indexOf(dataDelete._id)
                // if (dataDelete._id == req.params.answerid) {
                //     return dataDelete.splice(0, 1)
                // }
            })
            res.send(data)
        })
}

module.exports = methods