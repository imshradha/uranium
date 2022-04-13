const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: {
        type : String,
        required : true
    } ,
    authorName: String, 
    tags: [String],
    
    isPublished:  Boolean  ,
    prices: {
        indianPrice: String,
        europePrice: String,
    },
    year : { 
        type : Number,
        default : 2021
    },
    totalPages : Number,
    stocksAvailable : Boolean
    //sales: {type: Number, default: 10}
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema) //users









//Validation:
//require:true
//unique
// default

//String
//Number
//Date
//Boolean
// Arrays
// Object
// ObjectId
// Buffer - not cover
