// import database connection
const db = require('../../config/mongoose')

const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json')

  
  // create seed data
db.once('open', () => {
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