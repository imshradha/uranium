const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const WeatherController = require("../controllers/weatherController")
const MemeController = require("../controllers/memeController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)
router.post("/cowin/getOtp", CowinController.getOtp)
router.get("/cowin/getByDisttrictId", CowinController.getSessionByDistrictId)

//Weather

router.get("/weather/getLondonTemp", WeatherController.getWeather)
router.get("/weather/getSortedCities", WeatherController.getSortedCities)

//Meme

router.post("/getMemes", MemeController.createMeme)

module.exports = router;