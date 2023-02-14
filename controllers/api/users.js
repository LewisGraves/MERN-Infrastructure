const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

function createJWT(user) {
    return jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    )
}

async function create(req, res) {
    // just want to see if this is connected
    try {
        console.log(req.body)
        const user = await User.create(req.body)

        const token = createJWT(user)

        res.json(token)
    } catch (error){
        res.status(400).json(error)
    }
}

async function logIn(req, res) {
    try {
        // get the user that's trying to login
        //check if the password is valid
        // if so create 
        const user = await User.findOne({ email: req.body.email })
        if (!user) throw new Error()
        const passwordsMatch = bcrypt.compare(req.body.password, user.password)
        if (passwordsMatch) {
            res.json(createJWT(user))
        } else {
            throw new Error()
        }
    } catch {
        res.status(400).json('Incorrect username or password')
    }
}

function checkToken(req, res) {
    console.log('req.user', req.user)
    res.json(req.exp)
}

module.exports = {
    create,
    logIn,
    checkToken
}