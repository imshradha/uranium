const batchModel = require("../models/batchModel")
const developerModel= require("../models/developerModel")

const createDeveloper= async function (req, res) {
    let developer = req.body
    let developerCreated = await developerModel.create(developer)
    res.send({data: developerCreated})
}

const scholarDevelopers = async function(req, res) {
    let eligibleDevelopers = await developerModel.find(
        
        {gender:"female", percentage:{$gte:70}}).select({name:1, _id:0})
    
        res.send({data: eligibleDevelopers})
}

// const developers = async function(req, res) {
//     const getDetails = req.query
//     const data = await developerModel.find(
//         {percentage:{$gte:getDetails.percentage}}).select({batch:1, _id:0})
//     const findData = await batchModel.find({_id:data[0].batch,program:getDetails.program})
//     res.send({data:findData})
// }

const developers = async function(req, res) {
    let data = req.query
    let batchName = data.program
    let reqPercent = data.percentage
    let reqBatch = await batchModel.find({name:batchName}).select({_id:1})
    let result = await developerModel.find({percentage:{$gte:reqPercent}, batch:reqBatch}).populate('batches')
    res.send({data:result})
}

module.exports.createDeveloper= createDeveloper
module.exports.scholarDevelopers= scholarDevelopers
module.exports.developers= developers

