

const mid4= function ( req, res, next) {
    console.log("Hi I am a middleware named Mid4")
    //counter
    next()
}

// const checkFreeAppUser = async function(req,res,next){
//     let freeappuser = req.header.isfreeappuser
//     if(freeappuser === undefined){
//         res.send({err: "The Mandatory header not present, user can't be created"})
//     }else {
//         next()
//     }
// }

//module.exports.checkFreeAppUser = checkFreeAppUser




// module.exports.mid1= mid1
// module.exports.mid2= mid2
// module.exports.mid3= mid3
// module.exports.mid4= mid4
