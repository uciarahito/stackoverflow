const mongo = require('mongodb')
const User = require('../models/user')
const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken')
var methods = {}
require('dotenv').config();

methods.getAll = (req, res) => {
    User.find({}, (err, records) => {
        if (err) {
            console.log(err);
            res.json({
                err
            })
        }
        console.log(records);
        res.json(records)
    })
} //getAll

methods.getById = (req, res) => {
    User.findById(req.params.id, (err, record) => {
        if (err) {
            console.log(err);
            res.json({
                err
            })
        }
        console.log(record);
        req.json(record)
    })
} // getById

methods.insertOne = (req, res, next) => {
    let pwdHash = req.body.password
    let newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: passwordHash.generate(pwdHash),
        email: req.body.email
    })
    newUser.save(function(err, record) {
        if (err) return console.error(err);
        res.json(record)
    });
} // insertOne

methods.updateById = (req, res, next) => {
    let pwdHash = req.body.password
    User.findById(req.params.id)
        .then(record => {
            User.updateOne({
                    "_id": new mongo.ObjectID(req.params.id)
                }, {
                    $set: {
                        "name": req.body.name || record.name,
                        "username": req.body.username || record.username,
                        "password": passwordHash.generate(pwdHash) || record.password,
                        "email": req.body.email || record.email
                    }
                })
                .then((record) => {
                    res.json(record)
                })
                .catch(err => {
                    res.json({
                        err,
                        message: 'Error waktu update User'
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

methods.deleteById = (req, res, next) => {
    User.findByIdAndRemove(req.params.id)
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

methods.signup = (req, res, next) => {
    let pwdHash = req.body.password
    User.create({
            name: req.body.name,
            username: req.body.username,
            password: passwordHash.generate(pwdHash),
            email: req.body.email
        })
        .then(record => {
            res.json(record)
        })
        .catch(error => {
            res.json({
                error
            })
        })
} // signup

methods.signin = (username, password, next) => {
    User.findOne({
            username: username
        })
        .exec(function(err, record) {
            if (passwordHash.verify(password, record.password)) {
                let data = Object.assign({}, record.toJSON())
                let token = jwt.sign(data, process.env.TOKEN_SECRET, {
                    expiresIn: '1d'
                })
                next(null, {
                    message: 'Login is Successful',
                    token
                })
            } else {
                next({
                    message: 'Your password is not match'
                })
            }
        })
} //signin

module.exports = methods