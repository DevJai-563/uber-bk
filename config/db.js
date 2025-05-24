const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected '))
    .catch(err => console.log(err));
}

module.exports = connectDB;

// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config();

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.Mongo_URI); 
//         console.log(" MongoDB Connected");
//     } catch (error) {
//         console.error(" MongoDB Connection Error:", error);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;
