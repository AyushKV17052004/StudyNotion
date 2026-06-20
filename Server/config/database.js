const mongoose  = require("mongoose");

require("dotenv").config();

const dbConnect = ()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("Connection Successfull");
    })
    .catch((error)=>{
        console.log("Error in DB Connection:", error.message);
        console.error(error);
        process.exit(1);
    })
}

module.exports = dbConnect;