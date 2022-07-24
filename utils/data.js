const fs = require('fs')
const axios = require('axios')
const apikey = 'b5cff164'
const baseOmdbUrl = 'http://www.omdbapi.com/?apikey=' + apikey
let data = fs.readFileSync('data/movies.json')

const getAllMovies = function () {
    let movieData = JSON.parse(data)
    let promises = []
    for (const [key, value] of Object.entries(movieData['movies'])) {
        promises.push(
            axios.get(baseOmdbUrl + '&i=' + value['imdb_id']).then(response => {
                for (const [key2, value2] of Object.entries(movieData['sellers'])) {
                    if (movieData['sellers'][key2]['id'] === movieData['movies'][key]['seller_id']) {
                        movieData['movies'][key]['seller_name'] = value2['name']
                        movieData['movies'][key]['shipping_rate'] = value2['shipping_rate']
                    }
                }
                delete (movieData['movies'][key]['seller_id'])
                movieData['movies'][key]['title'] = response.data['Title']
                movieData['movies'][key]['genre'] = response.data['Genre']
                movieData['movies'][key]['runtime'] = response.data['Runtime']
                movieData['movies'][key]['price'] = response.data['Runtime'].replace(/\D/g, "") / 10
            })
        )
    }

    return Promise.all(promises).then(() => {
        return movieData['movies']
    })
}

const getMovie = function (imdbId) {
    let movieData = JSON.parse(data)
    let promises = []
    let thisMovie
    for (const [key, value] of Object.entries(movieData['movies'])) {
        if (imdbId === movieData['movies'][key]['imdb_id']) {
            promises.push(
                axios.get(baseOmdbUrl + '&i=' + value['imdb_id']).then(response => {
                    for (const [key2, value2] of Object.entries(movieData['sellers'])) {
                        if (movieData['sellers'][key2]['id'] === movieData['movies'][key]['seller_id']) {
                            movieData['movies'][key]['seller_name'] = value2['name']
                            movieData['movies'][key]['shipping_rate'] = value2['shipping_rate']
                        }
                    }
                    delete (movieData['movies'][key]['seller_id'])
                    movieData['movies'][key]['title'] = response.data['Title']
                    movieData['movies'][key]['genre'] = response.data['Genre']
                    movieData['movies'][key]['runtime'] = response.data['Runtime']
                    movieData['movies'][key]['price'] = response.data['Runtime'].replace(/\D/g, "") / 10
                    movieData['movies'][key]['plot'] = response.data['Plot']
                    movieData['movies'][key]['awards'] = response.data['Awards']
                    movieData['movies'][key]['poster_image'] = response.data['Poster']
                    thisMovie = movieData['movies'][key]
                })
            )
        }
    }

    return Promise.all(promises).then(() => {
        return thisMovie
    })
}

module.exports = { getAllMovies, getMovie }