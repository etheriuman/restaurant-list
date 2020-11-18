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

// searching requesting
router.get('/search', (req, res) => {
  let keyword = req.query.keyword? req.query.keyword.trim() : ''
  const type = req.query.type
  const sequence = req.query.sequence
  console.log(type, sequence)
  // find   
  Restaurant.find({$or:[{name: new RegExp(keyword, 'i')}, {category: new RegExp(keyword, 'i')}]})
            .lean()
            .sort({[type]: sequence})
            .then(restaurants => res.render('index', {restaurants, keyword, type, sequence, css: 'index.css'}))
            .catch(error => console.log(error))
})

// export as module
module.exports = router