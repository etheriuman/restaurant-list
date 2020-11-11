// insert dependencies and documents
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')


// set express to app
const app = express()
// set port number
const port = 3000

// set template engine
app.set('view engine', 'handlebars')
// set default layout
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
// set static documents file and body parser
app.use(express.static('public'), bodyParser.urlencoded({extended: true}))

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
})


// ---------------- route setting ------------------

// index page requesting
app.get('/', (req, res) => {
  Restaurant.find()
            .lean()
            .then(restaurants => res.render('index', {restaurants, css: 'index.css'}))
            .catch(error => console.log(error))
})

// to create page requesting
app.get('/restaurants/new', (req, res) => {
  res.render('new', {css: 'show.css'})
})

// show page requesting
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
            .lean()
            .then(restaurant => res.render('show', {restaurant, css: 'show.css'}))
            .catch(error => console.log(error))
})

// searching requesting
app.get('/search', (req, res) => {
  let keyword = req.query.keyword.trim()
  // find   
  Restaurant.find({$or:[{name: new RegExp(keyword, 'i')}, {category: new RegExp(keyword, 'i')}]})
            .lean()
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
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
            .lean()
            .then(restaurant => res.render('edit', {restaurant, css: 'show.css'}))
            .catch(error => console.log(error))
})

// create requesting
app.post('/restaurants/new', (req, res) => {
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
app.post('/restaurants/:id/edit', (req, res) => {
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
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
            .then(restaurant => restaurant.remove())
            .then(() => res.redirect('/'))
            .catch(error => console.log(error))
})

// --------------- localhost listenig --------------------
app.listen(port, () => {
  console.log(`this server is now running on http://localhost:${port}`)
})