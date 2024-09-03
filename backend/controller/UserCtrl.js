const User = require('../Models/UserModel');
const asyncHandler = require('express-async-handler');

const creteUser = asyncHandler(
  async (req,res) => {
    
    console.log(req.body)
    const email = req.body.email;
  
    const findUser = await User.findOne({ email : email });
    if(!findUser){
      const newUser = await User.create(req.body);
      res.json(newUser)
    }else{
     throw new Error("User Already Exit!");
    }
  }
)

const getUser = asyncHandler(
  async (req,res) => {
    const {email,password} = req.body;
    const findUser = await User.findOne({ email,password });
    if(findUser){
      res.status(200).json(findUser)
    }else{
      res.status(404).json({"message":"User Not Found"});
    }
  }
)

const getAllUser = asyncHandler(
  async (req,res) => {
    try{
      const users = await User.find();
      res.status(200).json(users);
    }catch(error){
      throw new Error(error);
    }
  }
)

module.exports = {creteUser,getAllUser,getUser};