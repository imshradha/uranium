const jwt = require("jsonwebtoken")

let auth = async function(req,res,next) {
    try{
    let token = req.headers["x-auth-token"]
    if(!token) return res.send("token should be present")
    let decodedToken = jwt.verify(token, "Its-mine");
    if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" });

    let logged = decodedToken.userId
    let user= req.params.userId
    if(logged!=user) return res.send({status:false, msg:"user not allowed"})

    next()
    }catch {
        res.status(400).send({status: false, msg: "Invalid Token"})
    }
}

module.exports.auth = auth




// const mid= function ( req, res, next) {
//     let token = req.headers["x-auth-token"];

//   //If no token is present in the request header return error
//    if (!token) {
//        return res.send({ status: false, msg: "token must be present" });
//    }
//    else {
//        next()
//    }
// }

// module.exports.mid = mid