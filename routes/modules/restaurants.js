const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// to create page requesting
router.get('/new', (req, res) => {
  res.render('new', {css: 'show.css'})
})

// to show page requesting
router.get('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
            .lean()
            .then(restaurant => res.render('show', {restaurant, css: 'show.css'}))
            .catch(error => console.log(error))
})

// searching requesting
router.get('/search', (req, res) => {
  let keyword = req.query.keyword.trim()
  // find   
  Restaurant.find({$or:[{name: new RegExp(keyword, 'i')}, {category: new RegExp(keyword, 'i')}]})
            .lean()
            .sort({_id: 'asc'})
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

// to edit page requesting
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
            .lean()
            .then(restaurant => res.render('edit', {restaurant, css: 'show.css'}))
            .catch(error => console.log(error))
})

// create requesting
router.post('/new', (req, res) => {
  const name = req.body.name
  const category = req.body.category
  const location = req.body.location
  const google_map = req.body.google_map
  const phone = req.body.phone
  const rating = req.body.rating
  const image = req.body.image
  const description = req.body.description
  Restaurant.create({
              name,
              category,
              location,
              google_map,
              phone,
              rating,
              image,
              description
            })
            .then(() => res.redirect('/'))
            .catch(error => console.log(error))
})

// edit requesting
router.put('/:id', (req, res) => {
  const id = req.params.id

  Restaurant.findById(id)
            .then(restaurant => {
              restaurant = Object.assign(restaurant, req.body)
              restaurant.save()
            })
            .then(() => res.redirect(`/restaurants/${id}`))
            .catch(error => console.log(error))
})

// delete requesting
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
            .then(restaurant => restaurant.remove())
            .then(() => res.redirect('/'))
            .catch(error => console.log(error))
})

// export as module
module.exports = router