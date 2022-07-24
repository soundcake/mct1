const express = require('express')
const router = express.Router()
let data = require('../utils/data')

//list all movies
router.get('/movies', (req, res) => {
    data.getAllMovies().then(result => {
        res.send(result)
    })
})

//more details of a particular movie
router.get('/movies/view', (req, res) => {
    data.getMovie(req.query.imdbId).then(result => {
        res.send(result)
    })
})

module.exports = router