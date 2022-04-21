const OrderModel = require("../models/orderModel")
//const ObjectId = mongoose.Schema.Types.ObjectId;

const createOrder = async function(req,res){
    let data = req.body
    let userId = req.body.userId
    let productId = req.body.productId
    let header = req.headers.isfreeappuser
    let price = await ProductModel.find({price : productId})
    let userValidation  = await UserModel.exists(userId)
    let productValidation = await ProductModel.exists(productId)
    if(userValidation){
        if(productValidation){
            let purchase = await OrderModel.create(data)
            if(header == true){
                await UserModel.findById({_id : userId}).update({balance: (balance-price)},{new:true})
            }
            res.send({success : purchase})
        }
        res.send({err: "the product is not present"})
    }
    res.send({alert: "you are not a registered user, please register"})
}

module.exports.createOrder = createOrder












// const orderModel = require('../models/orderModel')
// const userModel = require('../models/userModel')
// const productModel  =require('../models/productsModel')

// const createOrder = async function(req,res){
//     let data = req.body
//     let userId = req.body.userId
//     let productId = req.body.productId
//     let header = req.headers["isfreeappuser"]
//     let price = await productModel.find({productId})
//     let userValidation  = await userModel.exists({userId})
//     let productValidation = await productModel.exists({productId})
//     if(userValidation){
//         if(productValidation){
//             let purchase = await orderModel.create(data)
//             if(header == true){
//                 await userModel.find({_id : userId}).update({balance: `${balance}-${price}`},{new:true})
//             }
//             res.send({success : purchase})
//         } else{
//             res.send({err: "the product is not present"})}
//     }else{
//         res.send({alert: "you are not a registered user, please register"})}
// }

// module.exports.createOrder = createOrder
