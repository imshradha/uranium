const ProductModel = require("../models/productModel")
 
const createProduct = async function(req,res) {
    let data = req.body
    let productData = await ProductModel.create(data)
    res.send({statue: true, data: productData})
}


module.exports.createProduct = createProduct

