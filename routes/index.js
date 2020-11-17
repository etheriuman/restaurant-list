// import express and set router()
const express = require('express')
const router = express.Router()

// import routers modules
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')

//set routes
router.use('/', home)
router.use('/restaurants', restaurants)

//export as module
module.exports = router