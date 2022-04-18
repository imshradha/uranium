const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    name: String,
    author: {
        type: ObjectId,
        ref: "NewAuthor",
        required: true
    },
    price: Number,
    ratings: Number,
    publisher: {
        type: ObjectId,
        ref: "newPublisher",
        required: true
    },
    isHardCover : {
        default: false
    }   

}, { timestamps: true });


module.exports = mongoose.model('newBook', bookSchema)
