const mongoose = require("mongoose");


const ProgressSchema = new mongoose.Schema(
    {
      
     courseID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
     },
     completedVideo:[{
          type:mongoose.Schema.Types.ObjectId,
          ref:"SubSection"
     }],
     percentage:{
        type:Number,
        default:0,
        min:0,
        max:100
     }
        
        
    }
)

module.exports = mongoose.model("CourseProgress" , ProgressSchema);