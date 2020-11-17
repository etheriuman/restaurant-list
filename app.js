// insert dependencies and documents
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

// set express to app
const app = express()
// set port number
const port = 3000

// connect to mongodb
require('./config/mongoose')

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


// --------------- localhost listenig --------------------
app.listen(port, () => {
  console.log(`this server is now running on http://localhost:${port}`)
})