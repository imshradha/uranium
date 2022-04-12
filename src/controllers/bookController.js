const BookModel = require("../models/bookModel")

const createNewBook = async function (req, res) {
    let data = req.body
    let savedData = await UserModel.create(data)
    res.send( {msg : savedData} )
}

const getListOfBooks = async function (req, res) {
    let allBooks= await UserModel.find()
    res.send({msg: allBooks})
}

module.exports.createNewBook = createNewBook
module.exports.getListOfBooks = getListOfBooks