const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//You can name the req, res objects anything.
  //but the first parameter is always the request    
  //the second parameter is always the response
const createUser = async function (req, res) {
  try{
    let data = req.body;
    let savedData = await userModel.create(data);
    res.status(201).send({ msg: savedData });
  } catch(err) {
    return res.status(400).send({err: "Bad Request"})
  }
};

const loginUser = async function (req, res) {
  try{
  let userName = req.body.emailId;
  let password = req.body.password;
  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({status: false, msg: "username or the password is not correct"});

  // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret
  // The same secret will be used to decode tokens
//   let token = jwt.sign(
//     {
//       userId: user._id.toString(),
//       batch: "thorium",
//       organisation: "FUnctionUp",
//     },
//     "functionup-thorium"
//   );
//   res.setHeader("x-auth-token", token);
//   res.send({ status: true, data: token });
// };
  let token = jwt.sign({userId: user._id.toString()}, "Its-mine");
  res.setHeader("x-auth-token", token);
  res.send({ status: true, data: token });
  }catch(err){
    return res.status(401).send({err: "Not Authenticated"})

  }
};

const getUserData = async function (req, res) {
  try{
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];

  //If no token is present in the request header return error
  if (!token) return res.send({ status: false, msg: "token must be present" });

  //console.log(token);
  
  // If a token is present then decode the token with verify function
  // verify takes two inputs:
  // Input 1 is the token to be decoded
  // Input 2 is the same secret with which the token was generated
  // Check the value of the decoded token yourself
  // let decodedToken = jwt.verify(token, "Its-me");
  // if (!decodedToken)
  //   return res.send({ status: false, msg: "token is invalid" });

  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });
  res.send({ status: true, data: userDetails });
} catch(err){
  return res.status(404).send({err: "Not Authenticated"})
}
};

// Do the same steps here:
// Check if the token is present
// Check if the token present is a valid token
// Return a different error message in both these cases

const updateUser = async function (req, res) {
  try{
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.send("No such user exists");
  }
  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id:userId }, userData, {new: true});
  res.send({ status: updatedUser, data: updatedUser });
}catch(err){
  return res.status(400).send({err: "Bad Request"})
}
};

const deleteUser = async function(req,res) {
  try{
  let userId = req.params.userId;
  let userData = req.body;
  let user = await userModel.findById(userId);
  if (!user) {
    return res.send("No such user exists");
  }
  res.status(200).send({ data: user})
}catch(err){
  return res.status(400).send({err: "Bad Request"})
}
};



module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;

