const mongoose = require('mongoose');


const connectDb = async (url) =>{
    try {
       await mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
       console.log("connection successfully");
    } catch (error) {
        console.log('db not connected');
    }
}


module.exports = connectDb;