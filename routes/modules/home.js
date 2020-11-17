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

// sorting requesting
router.get('/sort/:type/:sequence', (req, res) => {
  const type = req.params.type
  const sequence = req.params.sequence
  console.log(type, sequence)
  Restaurant.find()
            .lean()
            .sort({[type]: sequence})
            .then(restaurants => res.render('index', {restaurants, css: 'index.css'}))
            .catch(error => console.log(error))
})

// searching requesting
router.get('/search', (req, res) => {
  let keyword = req.query.keyword.trim()

  // find   
  Restaurant.find({$or:[{name: new RegExp(keyword, 'i')}, {category: new RegExp(keyword, 'i')}]})
            .lean()
            .sort({_id: asc})
            .then(restaurants => {
              // exception
              if (!restaurants.length) {
                keyword = `你的收藏沒有"${keyword}"的相關項目唷！`
              }
              // do the searching
              res.render('index', {restaurants, keyword, css: 'index.css'})
            })
            .catch(error => console.log(error))
})

// export as module
module.exports = router