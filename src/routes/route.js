const express = require('express');

const router = express.Router();
const logger = require('./logger')

router.get('/test-me', function (req, res) {
    console.log("I am In");
    console.log('The endpoint value is',logger.url)
    console.log('calling log fuction')
    logger.logging()
    
    res.send('My first ever api!')
});

router.get('/test-me1', function (req, res) {
    console.log("I am In");
    res.send('My second ever api!')
});

module.exports = router;
// adding this comment for no reason