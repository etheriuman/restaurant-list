const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json')

// connect to database
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
// connection status
const db = mongoose.connection
// connect fail
db.on('error', () => {
  console.log('mongodb error!')
})
// connect succeed
db.once('open', () => {
  console.log('mongodb connected!')
  
  // create seed data
  restaurantList.results.forEach(restaurant => {
      Restaurant.create({
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description
    })
  })
  console.log('done')
})