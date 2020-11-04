// insert dependencies and documents
const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// set express to app
const app = express()
// set port number
const port = 3000

// set template engine
app.set('view engine', 'handlebars')
// set default layout
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
// set static documents file
app.use(express.static('public'))


// ---------------- route setting ------------------

// index page requesting
app.get('/', (req, res) => {
  res.render('index', {restaurants: restaurantList.results, css: 'index.css'})
})

// show page requesting
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => {
    return restaurant.id.toString() === req.params.restaurant_id
  })
  res.render('show', {restaurant: restaurant, css: 'show.css'})
})

// searching request
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const filteredRestaurant = restaurantList.results.filter(restaurant => {
    return restaurant.name.trim().toLowerCase().includes(keyword.trim().toLowerCase())
  })
  res.render('index', {restaurants: filteredRestaurant, css: 'index.css', keyword: keyword})
})

// --------------- localhost listenig --------------------
app.listen(port, () => {
  console.log(`this server is now running on http://localhost:${port}`)
})