// import express and set router()
const express = require('express')
// store router mothod
const router = express.Router()

// import routers
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')

//set routes directions
router.use('/', home)
router.use('/restaurants', restaurants)

//export as module
module.exports = router