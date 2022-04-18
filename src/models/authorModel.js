const mongoose = require('mongoose');

const newAuthorSchema = new mongoose.Schema( {
    authorName: String,
    age:Number,
    address:String,
    ratings: Number

}, { timestamps: true });

module.exports = mongoose.model('NewAuthor', newAuthorSchema)
