const express = require('express')
const router = express.Router()
let data = require('../utils/data')

//view basket
router.get('/basket', function (req, res) {
    if (!req.session.basket) req.session.basket = []
    res.send(req.session.basket)
})

//add movie to the basket
router.post('/basket/add', (req, res) => {
    const imdbId = req.body.imdbId
    data.getMovie(imdbId).then(result => {
        if (!req.session.basket) req.session.basket = []

        let objIndex = req.session.basket.findIndex((obj => obj.imdb_id === imdbId))

        if (req.session.basket[objIndex]) {
            req.session.basket[objIndex].quantity += 1
        }
        else {
            let basketItem = {}
            basketItem['imdb_id'] = imdbId
            basketItem['title'] = result['title']
            basketItem['shipping_rate'] = result['shipping_rate']
            basketItem['price'] = result['price']
            basketItem['quantity'] = 1
            req.session.basket.push(basketItem)
        }

        res.status(201).end()
    })
})

//update movie quantity in the basket
router.post('/basket/update', (req, res) => {
    const imdbId = req.body.imdbId
    const quantity = req.body.quantity

    if (!req.session.basket) req.session.basket = []

    let objIndex = req.session.basket.findIndex((obj => obj.imdb_id === imdbId))

    if (req.session.basket[objIndex])
        if (quantity > 0)
            req.session.basket[objIndex].quantity = parseInt(quantity)

    res.status(204).end()
})

//delete movie from the basket
router.delete('/basket/delete', (req, res) => {
    const imdbId = req.body.imdbId

    if (!req.session.basket) req.session.basket = []

    let objIndex = req.session.basket.findIndex((obj => obj.imdb_id === imdbId))

    if (req.session.basket[objIndex])
        req.session.basket.splice(objIndex, 1)

    res.status(204).end()
})

//checkout
router.post('/basket/checkout', (req, res) => {
    if (!req.session.basket) req.session.basket = []

    let totalPrice = 0
    let totalShipping = 0
    let total = 0

    req.session.basket.forEach(function (basketItem) {
        totalPrice += basketItem.quantity * basketItem.price
        totalShipping += basketItem.quantity * basketItem.shipping_rate
    })

    total = totalPrice + totalShipping

    console.log(`Total price: $${totalPrice.toFixed(2)} - Total shipping cost: $${totalShipping.toFixed(2)} - Total to pay: $${total.toFixed(2)}`)

    res.status(204).end()
})

module.exports = router