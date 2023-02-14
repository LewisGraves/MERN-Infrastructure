const express = require('express')
const path = require('path') 
const favicon = require('serve-favicon') 
const logger = require('morgan')

// always require and configure near the top
require('dotenv').config()
// connect to the database at the connection string url
require('./config/database')

// Configure to use port 3001 instead of 3000 during development to avoid collision with React's dev server
// Comes from .env file or port 3001
const PORT = process.env.PORT || 3001

const app = express()

app.use(logger('dev'))
app.use(express.json())

// Configure both the serve-favicon and the static middleware to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')))
// telling our express app to use this directory for our static assets
app.use(express.static(path.join(__dirname, 'build')))
// importing the checkToken middleware
app.use(require('./config/checkToken'))

//Put API routes here, before the "catch-all" route!
app.use('/api/users', require('./routes/api/users'))
app.use('/api/users/login', require('./routes/api/users'))

// the following "catch-all" route (note the *) is necessary to return the index.html on all non-AJAX requests
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Express app running on port ${PORT}`)
})