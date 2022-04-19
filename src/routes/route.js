const express = require('express');
const router = express.Router();
const { route } = require('express/lib/application');
const batchController= require("../controllers/batchController");
const developerController = require("../controllers/developerController");


router.post('/batches', batchController.createBatch)

router.post('/developers', developerController.createDeveloper)

router.get("/scholarship-developers", developerController.scholarDevelopers)

router.get('/developers?percentage=value1&program=value2', developerController.developers)


module.exports = router;