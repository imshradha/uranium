const AuthorModel= require("../models/authorModel")
const PublisherModel= require("../models/publisherModel")
const BookModel= require("../models/bookModel")
const mongoose = require('mongoose');
const bookModel = require("../models/bookModel");
const ObjectId = mongoose.Types.ObjectId

const createNewAuthor= async function (req, res) {
    let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.send({data: authorCreated})
}

const createNewPublisher= async function (req, res) {
    let publisher = req.body
    let publisherCreated = await PublisherModel.create(publisher)
    res.send({data: publisherCreated})
}

const createNewBook= async function (req, res) {
    //let book = req.body
    //let bookCreated = await BookModel.create(book)
    //console.log(bookCreated)
    let authorId = req.body.author
    let validAuthorId = await AuthorModel.findById(authorId)
    let publisherId = req.body.publisher
    let validPublisherId = await PublisherModel.findById(publisherId)
    //console.log(checkAuthorId)
    
    if(authorId == undefined) {
            res.send({msg: "Author id is required"})
    }
    else if(validAuthorId == null) {
        res.send({msg: "Author is not present"}) 
    }
    else if(publisherId == undefined) {
        res.send({msg: "Publisher id is required" })
    }
    else if(validPublisherId == null) {
        res.send({msg: "Publisher is not present"})
    }
    else {
        let book = req.body
        let bookCreated = await BookModel.create(book)
        res.send({data: bookCreated})
        
    }  
}

const getAllBooks = async function(req, res) {
    let allBooks = await BookModel.find().populate(['author', 'publisher'])
    res.send({data: allBooks})
}

// const updateBookDetails = async function(req,res) {
//     let newData = req.body  
//      res.send({data: newData})
// }

// const getBooks = async function(req, res) {
//     let updatedBookData = await BookModel.updateMany({publisher: ["Penguin", "HarperCollins"]},
//      {$set: {isHardCover: true}})
//      res.send({data: updatedBookData})
//      console.log(updatedBookData)
// }

const updatedBooks = async function(req, res) {
    let x = await PublisherModel.find({name:{$in:["Penguin", "HarperCollins"]}}).select({_id:1})
    for(let i in x) {
        let data = await BookModel.updateMany(
            {publisher: x[i]._id},
            {$set:{isHardCover: true}},
            {new: true}
        )
    }
    const data = await bookModel.find().populate("publisher")
    res.send({msg: data})
}

const updateBookByPrice = async function(req, res) {
    let data = await AuthorModel.find({ratings:{$gt: 3.5}}).select({_id:1})
    for(let i in data) {
        let y = data[i]._id
        let book = await BookModel.updateMany(
            {author: y},{$inc:{price:10}}
        )
    }
    let books = await BookModel.find().populate("author")
    res.send({msg: books})
}

module.exports.createNewAuthor= createNewAuthor
module.exports.createNewPublisher= createNewPublisher
module.exports.createNewBook= createNewBook
module.exports.getAllBooks= getAllBooks
module.exports.updatedBooks= updatedBooks
module.exports.updateBookByPrice= updateBookByPrice
