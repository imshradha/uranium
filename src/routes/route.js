const express = require('express');
const router = express.Router();

//const authorController= require("../controllers/authorController")
//const bookController= require("../controllers/bookController")
const AllController= require("../controllers/allController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createNewAuthor", AllController.createNewAuthor  )

router.post("/createNewPublisher", AllController.createNewPublisher)

router.post("/createNewBook", AllController.createNewBook)

router.get("/getAllBooks", AllController.getAllBooks)

router.put("/updatedBooks", AllController.updatedBooks)

router.put("/updateBookByPrice", AllController.updateBookByPrice)

module.exports = router;