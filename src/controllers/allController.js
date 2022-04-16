const AuthorModel = require('../models/authorsModel');
const BookModel = require('../models/bookModel');

const createNewAuthor = async function(req, res) {
    const data = req.body;
    const savedData = await AuthorModel.create(data)
    res.send({msg : savedData})
}

const createNewBook = async function(req, res) {
    const data = req.body;
    const savedData = await BookModel.create(data)
    res.send({msg : savedData})
}

const allBooks = async function(req, res) {
    const authorDetail = await AuthorModel.find({author_name : "Chetan Bhagat"})
    console.log(authorDetail)
    const id = authorDetail[0].author_id;
    //console.log(id)
    const booksName = await BookModel.find({author_id : id}).select({name : 1, _id:0})
    console.log(booksName)
    res.send({msg : booksName})
}

const updatedBookPrice = async function(req, res) {
    const bookDetail = await BookModel.find({book_name : "Two states"})
    const id = bookDetail[0].author_id;
    const authorName = await AuthorModel.find({author_id : id}).select({author_name:1, _id:0})
    const bkName = bookDetail[0].book_name
    console.log(bkName)
    const updatedPrice = await BookModel.findOneAndUpdate({book_name: bkName},{price:100},{new : true}).select({price:1, _id:0})
    res.send({msg : authorName, updatedPrice})
}

const authorsName = async function(req, res) {
    const booksId = await BookModel.find({price : {$gte: 50, $lte: 100}}).select({author_id:1, _id: 0})
    const id = booksId.map(input => input.author_id)
    let result = []
    for(let i =0; i < id.length; i++){
        let x = id[i]
        const author = await AuthorModel.find({author_id:x}).select({author_name : 1, _id : 0})
        result.push(author)
    }
    const authorName = result.flat()
    res.send({msg : authorName})
}

module.exports.createNewAuthor = createNewAuthor
module.exports.createNewBook = createNewBook
module.exports.allBooks = allBooks
module.exports.updatedBookPrice = updatedBookPrice
module.exports.authorsName = authorsName


