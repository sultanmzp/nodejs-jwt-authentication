const mongoose = require('mongoose');

const connectDB = async() =>{
    try{
        //used to connect to DB
        await mongoose.connect(process.env.MONGO_URI)//we can directly give link also
        console.log("DB connection is successful")
    }catch(err){
        console.log(err)
    }
}

module.exports = connectDB;