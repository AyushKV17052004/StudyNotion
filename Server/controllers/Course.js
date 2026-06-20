const Course = require("../models/Course")
const Category = require("../models/Category")
const User  = require("../models/User")
require("dotenv").config()
const {uploadImage} = require("../utils/imageUploader")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const CourseProgress = require("../models/CourseProgress")

exports.createCourse = async(req, res) =>{
    try{
      const {courseName , courseDescription , whatYouWillLearn ,  price , category , Tags , instructions }  = req.body;
      const {thumbnail}  = req.files;
      console.log(req.files)
      console.log(req.body)
      if(!courseDescription || !courseName || !category || !whatYouWillLearn || !price || !thumbnail){
        return res.status(404).json({
                success:false,
                message:"Fill out all the details"
            })
        
      }
      const userId = req.User.id;
      const instructorDetails = await User.findById(userId);
      if(!instructorDetails){
        return res.status(404).json({
                success:false,
                message:"Instructor not Found"
            })
        
      }
      //Category verification

    //   const tagDetails = await Tag.find({name:tag})
      const categoryDetails  = await Category.findOne({name:category})
      if(!categoryDetails){
        return res.status(404).json({
                success:false,
                message:"category can't be Found"
            })
        
      }

      //upload image

      const uploadedImage  = await uploadImage(thumbnail , process.env.FOLDER_NAME  )

      const courseResponse  = await Course.create({
        courseName,
        courseDescription,
        thumbnailUrl:uploadedImage.secure_url,
        price,
        whatYouWillLearn,
        Category:categoryDetails._id,
        instructor:instructorDetails._id,
        Tags,
        instructions


      })

      await User.findByIdAndUpdate({_id: instructorDetails._id},
        {
               $push:{
                 Courses: courseResponse._id
               }
        }
        ,
        {new:true}
      )
 
      await Category.findByIdAndUpdate({_id: categoryDetails._id},
        {
            $push:{
                course: courseResponse._id
            }
        }
        ,
        {new:true}
      )


      res.status(200).json({
        success:true,
        message:"Course Created Successfully",
        courseResponse
      })

    }
    catch(error){
   console.log(error);
    res.status(500).json({
        success:false,
        message:"Something went wrong while creating Course , plzzz try again later"
    })
    }
}


exports.getAllCourses = async(req, res)=>{
  try{
   const allCourses = await Course.find({ status: "Published" } , {
    courseName:true,
    courseDescription:true,
    instructor:true,
    price:true,
    whatYouWillLearn:true,
    ratingAndreview:true,
    thumbnailUrl:true,
    studentsEnrolled:true,
    status:true,
    Tags:true,
    Category:true
   }).populate("instructor").populate("Category").exec();
   
   if(!allCourses){
    return(
      res.status(404).json({
        success:false,
        message:"No Courses Found"
      })
    )
   }
   
   res.status(200).json({
    success:true,
    message:"All COurses fetched SuccessFully",
    allCourses
   })

  }
  catch(error){
    console.log(error);
    res.status(500).json({
        success:false,
        message:"Something went wrong while Fetching all Courses"
    })
  }
}


exports.getCourse = async(req, res)=>{
  try{
    const {courseId} = req.body;
   const Courses = await Course.findById(courseId)
   .populate(
    {path:"instructor",
    populate:{
      path:"additionalDetails"
    }
    }
   )
   .populate("Category")
   .populate(
    {
      path:"studentsEnrolled",
      populate:{
        path:"additionalDetails"}
    }
   )
   .populate(
    {
      path:"courseContent",
      populate:{
        path:"subSection"
      }
    }
   )
   .populate(
    {
      path:"ratingAndreview",
      populate:{
        path:"user",
        populate:{
          path:"additionalDetails"
        }
      }
    }
   )
   .exec()

   if(!Courses){
    return (res.status(400).json({
        success:false,
        message:"No Courses Found"
      }))
    
   }
   
   res.status(200).json({
    success:true,
    message:"Course fetched SuccessFully",
    Courses
   })

  }
  catch(error){
    console.log(error);
    res.status(500).json({
        success:false,
        message:"Something went wrong while Fetching all Courses"
    })
  }
}



exports.getInstructorCourses = async(req, res)=>{
  try{
    const InstructorId = req.User.id;


    const Check  = await User.findById({_id: InstructorId})
    if(!Check){
      return res.status(404).json({
        success:false,
        message:"Instructor Not Found"
      })
    }

   const Courses = await Course.find({instructor:InstructorId}).populate(
    {path:"instructor",
    populate:{
      path:"additionalDetails"
    }
    }
   )
   .populate("Category")
   .populate(
    {
      path:"studentsEnrolled",
      populate:{
        path:"additionalDetails"}
    }
   )
   
   

   if(!Courses){
    return (res.status(400).json({
        success:false,
        message:"No Courses Found made By Instructor"
      }))
    
   }
   
   res.status(200).json({
    success:true,
    message:"Course fetched SuccessFully",
    Courses
   })

  }
  catch(error){
    console.log(error);
    res.status(500).json({
        success:false,
        message:"Something went wrong while Fetching all Courses"
    })
  }
}

exports.updateCourse = async(req,res) =>{
  try{
      const {courseId, courseName , courseDescription , whatYouWillLearn ,  price , category , Tags , instructions }  = req.body;
      const thumbnail  = req.files?.thumbnail;

     if(!courseId || !courseDescription || !courseName || !category || !whatYouWillLearn || !price ){
        return res.status(404).json({
                success:false,
                message:"Fill out all the mandatory details"
            })
      }

    const courseDetails = await Course.findById(courseId);
    if(!courseDetails){
      return res.status(404).json({
        success:false,
        message:"Course to be updated can't be found"
      })
    }

    const categoryDetails  = await Category.findOne({name: category}) || await Category.findById(category)
      if(!categoryDetails){
        return res.status(404).json({
                success:false,
                message:"category can't be Found"
            })
      }

      const updateData = {
          courseName,
          courseDescription,
          whatYouWillLearn,
          price,
          Category: categoryDetails._id,
          Tags,
          instructions
      }

      if(thumbnail){
        const uploadedImage  = await uploadImage(thumbnail , process.env.FOLDER_NAME)
        updateData.thumbnailUrl = uploadedImage.secure_url
      }

      await Course.findByIdAndUpdate(courseId, updateData, {new:true})

      return res.status(200).json({
        success:true,
        message:"Course updated Successfully"
      })

  }
  catch(error){
        console.log(error)
        res.status(500).json({
          success:false,
          message:error.message
        })
  }
}

exports.deleteCourse = async(req, res) => {
  try{
    const {courseId} = req.body;
   const Courses = await Course.findById({_id:courseId})
     if(!Courses){
    return (res.status(404).json({
        success:false,
        message:"No Courses Found"
      }))
    
   }


   await Category.findByIdAndUpdate(
  Courses.Category,
  {
    $pull: { course: courseId }
  },
  { new: true }
);
  
const Instructor  = req.User.id;

await User.findByIdAndUpdate(
  Instructor,
  {
    $pull: {Courses: courseId}
  }
)



 const sections = await Section.find({ _id: { $in: Courses.courseContent } });


  for (const section of sections) {
  await SubSection.deleteMany({
    _id: { $in: section.subSection },
  });
 
}


 await Section.deleteMany({
      _id: { $in: Courses.courseContent },
    });
  
  


  await Course.findByIdAndDelete(courseId)  



   
   res.status(200).json({
    success:true,
    message:"Course Deleted SuccessFully",
   
   })

  }
  catch(error){
    console.log(error);
    res.status(500).json({
        success:false,
        message:"Something went wrong while Deleting all Courses"
    })
  }
}

exports.publishCourse = async(req,res) =>{
  try{
    const {courseId} = req.body;

    const course  = await Course.findByIdAndUpdate({_id:courseId},
      {
        status:"Published"
      },
      {new:true}
    );

    if(!course){
      return (res.status(404).json({
        success:false,
        message:"No Courses Found"
      }))
    }

    res.status(200).json({
    success:true,
    message:"Course Published SuccessFully",
   
   })
    


  }
  catch(error){
     console.log(error);
    res.status(500).json({
        success:false,
        message:"Something went wrong while Publishing Course"
    })
  }
}

exports.PurchaseCourse = async(req,res) =>{
  try{
   const {courseId} = req.body;
   const userId  = req.User.id;



   if(!courseId){
    return res.status(404).json({
      success: false,
      message: "No Courses Found to be Purcahsed"
    })
   }

   const student = await User.findById(userId)
 

  const alreadyPurchased = student.Courses.some(
  (id) => id.toString() === courseId
);

if (alreadyPurchased) {
  return res.status(400).json({
    success: false,
    message: "Course already purchased"
  });
}

const Progress  = await CourseProgress.create(
  {
        courseID: courseId,
        completedVideo: [],
        percentage: 0
      }
)

   const Student = await User.findByIdAndUpdate(
  userId,
  {
    $push: {
      Courses: courseId,
      CourseProgression: Progress
    }
  },
  { new: true }
);

   const courseResponse = await Course.findByIdAndUpdate(courseId ,
    {
      $push:{
        studentsEnrolled: userId
      }
    } ,
    {new: true}
   )
   if(!Student || !courseResponse){
    return res.status(400).json({
      success: false,
      message:"Unable to Purchase Course right Now"
    })
   }
  
   res.status(200).json({
    success:true,
    message: "Course Purchased Successfully"
   })





  }
  catch(error){
     console.log(error);
    res.status(500).json({
        success:false,
        message:"Something went wrong while Purchasing Course"
    })
  }
}


exports.getEnrolledCourses = async(req,res)=>{

  try{
 
    const userId = req.User.id;

    const Student = await User.findById(userId)
      .populate("Courses")
      .populate("CourseProgression")
      .exec();

    if(!Student){
      return res.status(400).json({
        success:false,
        message:"Unable to find User"
      })
    }

    res.status(200).json({
      success:true,
      message:"Courses Fetched Successfully",
      Student
    })


  }
  catch(error){
      console.log(error);
    res.status(500).json({
        success:false,
        message:"Something went wrong while Fetching Enrolled Courses"
    })
  }
}


exports.completeCourse  = async(req,res) =>{

  try{
  const userId = req.User.id;
  const {courseId} = req.body;

  if(!courseId){
    return res.status(400).json({
      success:false,
      message:"Course ID is required"
    })
  }

  const student = await User.findById(userId);
  const progressDoc = await CourseProgress.findOne({
    courseID: courseId,
    _id: { $in: student.CourseProgression }
  });

  if(!progressDoc){
    return res.status(404).json({
      success:false,
      message:"Course progress not found"
    })
  }

  const ProgressUpdation = await CourseProgress.findByIdAndUpdate(
    progressDoc._id,
    { percentage: 100 },
    { new: true }
  )

  if(!ProgressUpdation){
    return res.status(400).json({
      success:false,
      message:"Something went wrong!"
    })
  }

  res.status(200).json({
    success:true,
    message:"Course marked as completed",
    ProgressUpdation
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

exports.markVideoComplete = async(req, res) => {
  try {
    const userId = req.User.id;
    const { courseId, subsectionId } = req.body;

    if(!courseId || !subsectionId) {
      return res.status(400).json({
        success: false,
        message: "courseId and subsectionId are required"
      });
    }

    const student = await User.findById(userId);
    const course = await Course.findById(courseId).populate({
      path: "courseContent",
      populate: { path: "subSection" }
    });

    if(!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const isEnrolled = student.Courses.some(
      (id) => id.toString() === courseId.toString()
    );

    if(!isEnrolled) {
      return res.status(403).json({ success: false, message: "Not enrolled in this course" });
    }

    let progress = await CourseProgress.findOne({
      courseID: courseId,
      _id: { $in: student.CourseProgression }
    });

    if(!progress) {
      progress = await CourseProgress.create({
        courseID: courseId,
        completedVideo: [],
        percentage: 0
      });
      await User.findByIdAndUpdate(userId, {
        $push: { CourseProgression: progress._id }
      });
    }

    let totalVideos = 0;
    course.courseContent.forEach((section) => {
      totalVideos += section.subSection?.length || 0;
    });

    const alreadyCompleted = progress.completedVideo.some(
      (id) => id.toString() === subsectionId.toString()
    );

    if(!alreadyCompleted) {
      progress.completedVideo.push(subsectionId);
    }

    progress.percentage = totalVideos > 0
      ? Math.min(100, Math.round((progress.completedVideo.length / totalVideos) * 100))
      : 0;

    await progress.save();

    res.status(200).json({
      success: true,
      message: "Progress updated",
      progress
    });
  } catch(error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}