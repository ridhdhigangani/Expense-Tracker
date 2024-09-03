const asyncHandler = require('express-async-handler');
const TransectionModel = require('../Models/TransModel');
const moment = require('moment');

const createTrans = asyncHandler(
  
  async (req,res) => {
    try{
      console.log("create")
      const Trans = await TransectionModel.create(req.body);
      res.status(200).send(Trans);
    }catch(error){
      throw new Error(error);
    }
  }
)

const updateTrans = asyncHandler(
  async (req,res) => {
    try{
      const Trans = await TransectionModel.findOneAndUpdate(
                                    {_id: req.body.transectionId},
                                    req.body.payload
                                    );
      res.status(200).send(
       "Updated successfully"
      );
    }catch(error){
      res.status(500).send(error);
    }
  }
)

const deleteTrans = asyncHandler(
  async (req,res) => {
    try{
      console.log("delete");
      const Trans = await TransectionModel.findOneAndDelete(
                                    {_id: req.body.transectionId});
      res.status(200).send(
       "Deleted successfully"
      );
    }catch(error){
      res.status(500).send(error);
    }
  }
)

const getAllTrans = asyncHandler(
  async (req,res) => {
    try{
       const {frequency,selectedDate,type} = req.body;
       const Trans = await TransectionModel.find({
        ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").format('YYYY-MM-DD'),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
        userid : req.body.userid,
        ...(type !== "All" && {type}) 
      });
       res.status(200).send(Trans);
    }catch(error){
       res.status(404).send(error.message);
    }
  }
)

module.exports = {createTrans,getAllTrans,updateTrans,deleteTrans};