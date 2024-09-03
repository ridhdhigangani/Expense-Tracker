const mongoose = require('mongoose');

const dbConnect = () => {
  try{
    const connect = mongoose.connect("mongodb://localhost:27017/Expense-Tracking-App");
    console.log("Connected to MongoDB");
  }catch(error){
    console.log("Error connecting to MongoDB: "+error);
  }
}

module.exports = {dbConnect};

  