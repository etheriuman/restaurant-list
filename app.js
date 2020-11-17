// insert dependencies and documents
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const routes = require('./routes')

// set express to app
const app = express()
// set port number
const port = 3000

// set template engine
app.set('view engine', 'handlebars')

// set default layout
app.engine('handlebars', exphbs({defaultLayout: 'main'}))

// set static documents file and body parser
app.use(
  express.static('public'),
  bodyParser.urlencoded({extended: true}),
  methodOverride('_method'),
  routes
)

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


// --------------- localhost listenig --------------------
app.listen(port, () => {
  console.log(`this server is now running on http://localhost:${port}`)
})