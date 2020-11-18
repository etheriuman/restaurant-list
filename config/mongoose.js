// import mongoose
const mongoose = require('mongoose')

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

// export to modules
module.exports = db