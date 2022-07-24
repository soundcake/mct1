"use strict"

const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express()

app.use(session({
    secret: 'test one',
    resave: false,
    saveUninitialized: true,
    name: "mycookiesession",
    cookie: { secure: false }
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(require('./routes/movies'))
app.use(require('./routes/basket'))

app.listen(3000, function () {
    console.log('App listening on port 3000')
})