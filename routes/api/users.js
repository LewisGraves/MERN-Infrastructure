const express = require('express')
const router = express.Router()

const usersCtrl = require('../../controllers/api/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// localhost:3000/api/user/
// app.use('/api/users')
router.post('/', usersCtrl.create)

// login route
router.post('/login', usersCtrl.logIn)

router.get('/check-token', usersCtrl.checkToken, usersCtrl.checkToken)

module.exports = router