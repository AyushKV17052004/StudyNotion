const { default: mongoose } = require("mongoose");
const Course  = require("../models/Course");
const ratingAndreview = require("../models/rating&review");



exports.createRating = async(req , res)=>{
    try{
        const {rating , review , courseId} = req.body;
        const userId = req.User.id;
         if(!rating || !review ){
            return res.status(400).json({
                success:false,
                message:"Please enter mandatory fields "
            })
         }
      
         
         const courseDetail = await Course.findById({_id:courseId});
         if(!courseDetail){
            return res.status(404).json({
                success:false,
                message:"Course not found"
            })
         }
            if(!(courseDetail.studentsEnrolled.some(
              (id) => id.toString() === userId.toString()
            ))){
            return res.status(400).json({
                success:false,
                message:"User is not enrolled in course"
            })
         }
         
         const alreadyRated = await ratingAndreview.findOne({
            user:userId,
            Course:courseId
         }
         )

         if(alreadyRated){
            return res.status(400).json({
                    success:false,
                    message:"User has already rated the course"
                })
            
         }
         const rate = await ratingAndreview.create(
            {
                rating,
                review,
                user:userId,
                Course:courseId
            }
         )
       const updatedCourse = await Course.findByIdAndUpdate(
            {_id:courseId},
            {
            $push:{
                ratingAndreview:rate._id
            }}
            ,
            {new:true}
         )

         return res.status(200).json({
            success:true,
            message:"Rating Done Successfully",
            rate,
            updatedCourse
         })


    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })

    }
}

exports.getAvgRating = async(req,res) =>{
    try{
       const {courseId} = req.body;
       const result  = await ratingAndreview.aggregate([
        {
            $match:{
                Course:new mongoose.Types.ObjectId(courseId)
            }

        }
        ,
        {
            $group:{
                _id:null,
                averageRating:{ $avg: "$rating"},
            }
        }
       ])
       if(result.length>0){
        return res.status(200).json({
            success:true,
            averageRating:result[0].averageRating
        }) 
       }
       else{
        return res.status(200).json({
            success:false,
            averageRating:0
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
}


exports.getCourseRatings = async(req,res) =>{
    try{
        const {courseId} = req.body;

        const allRatings = await Course.findById(courseId).populate(
            {
                path:"ratingAndreview",
                populate:{
                    path:"user"
                }
            }
        ).exec()

         return res.status(200).json({
                success:true,
                message:"All ratings fetched Successfully",
                allRatings
            }) 




    }
    catch(error){
         return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}

exports.getAllRatings = async(req,res) =>{
    try{
       

        const allRatings  = await ratingAndreview.find({})
                   .sort({rating:"desc"})
                   .populate(
            {
                path:"user",
                select:"firstName lastName email imgURL"
            }
        )
        .populate(
            {
                path:"Course",
                select:"courseName "
            }
        )
        .exec()

         return res.status(200).json({
                success:true,
                message:"All ratings fetched Successfully",
                allRatings
            })




    }
    catch(error){
         return res.status(500).json({
            success:false,
            message:error.message
        })
       
    }
}

exports.deleteRating = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.User.id;

    const reviewDetail = await ratingAndreview.findById(reviewId);
    if (!reviewDetail) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
      });
    }

    // Access check: Only the user who posted the review can delete it
    if (reviewDetail.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own reviews"
      });
    }

    // Remove review from Course's array
    await Course.findByIdAndUpdate(
      reviewDetail.Course,
      {
        $pull: {
          ratingAndreview: reviewId
        }
      }
    );

    // Delete the review document itself
    await ratingAndreview.findByIdAndDelete(reviewId);

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
exports.getMyReviewForCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.User.id;

    const review = await ratingAndreview.findOne({
      user: userId,
      Course: courseId,
    });

    return res.status(200).json({
      success: true,
      review: review || null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
