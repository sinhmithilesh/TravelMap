const express = require('express')
const router = express.Router()

const {createPin, getAllPins} = require("../controller/pin.js")


// create a pin
 router.post("/", createPin)

//get all pins
router.get("/", getAllPins)

module.exports = router