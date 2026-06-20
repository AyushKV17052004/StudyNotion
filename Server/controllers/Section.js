const Section = require("../models/Section")
const Course = require("../models/Course")

const SubSection = require("../models/SubSection")

exports.createSection = async(req , res) =>{

    try{
          const {sectionName , courseId} = req.body;
          if(!sectionName || !courseId){
            return res.status(400).json({
                    success:false,
                    message:"Enter Required Details"
                })
            
          }
          const section = await Section.create({
            sectionName
          })

          const updatedCourse  = await Course.findByIdAndUpdate({_id:courseId},{
            $push:{
                courseContent:section._id
            }
        },
        {new:true})
        //   ).populate("courseContent").exec()


        return res.status(200).json({
                success:true,
                message:"Section created Successfully",
                updatedCourse,
                section
            })
        
          
    }
    catch(error){

        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while creating Section"
        }) 
    }

}


exports.updateSection = async(req, res) =>{
    try{
          const {newSectionName  , sectionId} = req.body;
          if(!newSectionName || !sectionId){
             return res.status(400).json({
                    success:false,
                    message:"Enter Updated Details"
                })
            
          }
          const updatedSection = await Section.findByIdAndUpdate(sectionId,
            {
              sectionName:newSectionName
            }
            ,
            {new:true}
          )
          if(!updatedSection){
               return res.status(404).json({
                    success:false,
                    message:"Section not Found!"
                })
            
          }
           return res.status(200).json({
                success:true,
                message:"Section Updated Successfully",
                // updatedSection
            })
        

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while updating Section"
        })
    }
}


exports.deleteSection = async(req,res) =>{
    try{
          const {sectionId , courseId} = req.body;
          if(!sectionId || !courseId ){
             return res.status(400).json({
                    success:false,
                    message:"SectionId or CourseId can't be Fetched"
                })
            
          }
          //I think course pull required here
          const section = await Section.findById(sectionId)
          if (!section) {
            return res.status(404).json({
                success:false,
                message:"Section not Found!"
            })
          }
          await SubSection.deleteMany({
      _id: { $in: section.subSection },
    });

          const deletedSection = await Section.findByIdAndDelete(sectionId)
          if(!deletedSection){
            return res.status(404).json({
                success:false,
                message:"Unable to find section to be deleted"
            })
          }
          const courseDetails = await Course.findByIdAndUpdate({_id:courseId},
            {
                $pull:{
                    courseContent:sectionId
                }
            }
            ,
            {new:true}
          );
          
          if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"No Course Found by the Id provided"
            })
          }
          

         return res.status(200).json({
                success:true,
                message:"Section Deleted Successfully",
                // updatedSection
            })
        

    }
    catch(error){
         console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while deleting Section"
        }) 
    }
}

exports.getAllSections = async(req, res) =>{
    try{
          const {courseId} = req.body;
          if(!courseId){
             return res.status(400).json({
                    success:false,
                    message:"Couldn't find any Course"
                })
            
          }
          const AllSection = await Course.findById(courseId).populate(
            {
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
                
            }
          ).exec()
          
          if(!AllSection){
               return res.status(404).json({
                    success:false,
                    message:"No Sections Created till now"
                })
            
          }
           return res.status(200).json({
                success:true,
                message:"Section Updated Successfully",
                AllSection
            })
        

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while fetching Sections"
        })
    }
}