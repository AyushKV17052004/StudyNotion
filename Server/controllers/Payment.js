const Course  = require("../models/Course")
const User  = require("../models/User")
const maileSender = require("../utils/sendOtp")
const {instance} = require("../config/razorpay")
const mongoose  = require("mongoose")
const crypto = require("crypto")

exports.capturePayment = async (req,res) =>{


   const {courseId} = req.body;
   const userId = req.User.id;
   
   if(!courseId || !userId){
       return res.status(400).json({
            success:false,
            message:"Course not found"
        })
       
   }
   let courseDetail;
   try{
    courseDetail = await Course.findById(courseId);
   if(!courseDetail){
      return res.status(400).json({
            success:false,
            message:"Course not found in all Courses"
        })
       
   }
   
   const uid  = new mongoose.Types.ObjectId(userId);
   if(courseDetail.studentsEnrolled.includes(uid)){
    return res.json({
            success:false,
            message:"Course already purchased"
        })
       
   }
}
catch(error){
 console.log(error);
 return res.status(500).json({
    success:false,
    message:error.message
 })
}

const amount = courseDetail.price;
const currency = "INR";
const options ={
    amount: amount*100,
    currency,
    receipt: Date.now().toString(),
    notes:{
        courseId:courseDetail._id,
        userId:userId
    }
}
try{
    const paymentResponse  = await instance.orders.create(options);
    console.log(paymentResponse);

    return res.status(200).json({
        success:true,
        message:"Order Successfully Created",
        courseName:courseDetail.courseName,
        courseDescription:courseDetail.courseDescription,
        currency:paymentResponse.currency,
        thumbnail:courseDetail.thumbnailUrl,
        orderId:paymentResponse.id,
        amount:paymentResponse.amount
    })

}
catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Could not create order at this moment"
    })

}


}

exports.verifyResponse = async(req,res)=>{
    try{
         const webhookSecret  = "12345";

         const signature = req.headers["x-razorpay-signature"];

        const shasum = crypto.createHmac("sha256" , webhookSecret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");
        if(digest == signature){
           console.log("Payment Verified");
           const {userId , courseId} = req.body.payload.payment.entity.notes;

           try{
             const updatedCourse = await Course.findOneAndUpdate(
                {_id:courseId},
                {
                    $push:{
                        studentsEnrolled:userId
                    }
                },
                {new:true}
             )
             if(!updatedCourse){
                return res.status(500).json({
                    success:false,
                    message:"Failed to add student to Course Enrolled"
                })
             }
             console.log(updatedCourse)
             const updatedUser = await User.findOneAndUpdate(
                {_id:userId},
                {
                    $push:{
                        Courses:courseId
                    }
                }
                ,
                {new:true}
             )
              if(!updatedUser){
                return res.status(500).json({
                    success:false,
                    message:"Failed to add course to Student account"
                })
             }
             console.log(updatedUser);
          const USER = await User.findById(userId); 
           const emailResponse  =await maileSender(USER.email , "Congaratulations on purchasing course" , `You have successfully purchased the course`)
          
           return res.status(200).json({
            success:true ,
            message:"Course Purchased Successfully",

           })
           }
           catch(error){
                console.log(error);
                return res.status(500).json({
                    success:false,
                    message:"Something went wrong while allocating course to student"
                })
           }
        }
        else{
            return res.status(500).json({
                success:false,
                message:"Failed to authorize Payment"
            })
        }

    }
    catch(error){
     console.log(error);
            res.status(500).json({
                    success:false,
                    message:error.message
                })
    }
}