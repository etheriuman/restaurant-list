const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// index page requesting
router.get('/', (req, res) => {
  Restaurant.find()
            .lean()
            .sort({_id: 'asc'})
            .then(restaurants => res.render('index', {restaurants, css: 'index.css'}))
            .catch(error => console.log(error))
})

// export as module
module.exports = router