const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const questionController = require('../controllers/questionController')
const passport = require('passport')
var methods = {}

// router.get('/', (req, res) => {
//     res.send('Hello World')
// })

// NOTE: User
router.get('/api/users', userController.getAll)
router.get('/api/user/:id', userController.getById)
router.post('/api/users', userController.insertOne)

router.post('/api/signup', userController.signup)
router.post('/api/signin', passport.authenticate('local', {
    session: false
}), function(req, res) {
    var user = req.user
    res.send(user)
})

// NOTE: Question
router.get('/api/questions', questionController.getAll)
router.get('/api/question/:id', questionController.getById)
router.post('/api/questions', questionController.insertOne)
router.put('/api/question/:id', questionController.updateById)
router.delete('/api/question/:id', questionController.deleteById)

router.put('/api/create/answer/:id', questionController.createAnswer)
// router.put('/api/edit/answer/:id', questionController.editAnswer)    // masih error

router.get('/api/getall/answer/:id', questionController.getAllAnswer)
router.get('/api/getdetail/answer/:id/:anwserid', questionController.getAnwerDetail)

module.exports = router