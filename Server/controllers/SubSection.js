const Section = require("../models/Section");
const SubSection = require("../models/SubSection");

const {uploadImage} = require("../utils/imageUploader")
require("dotenv").config()
exports.createSubSection = async(req,res) =>{
    try{
         const {title, description ,timeDuration , sectionId } = req.body;
         const videoFile = req.files.videoFile
         console.log(req.body)
         console.log(req.files)
         if(!title || !description || !timeDuration || !videoFile){
            return res.status(400).json({
                success:false,
                message:"Enter missing details"
            })
         }
         const Video = await uploadImage(videoFile , process.env.FOLDER_NAME  );
        if(!Video){
              return res.status(400).json({
                success:false,
                message:"failed to Upload Video to Cloudinary"
            }) 
        }

        const subsection = await SubSection.create({
            title, description , timeDuration , videoUrl:Video.secure_url
        }
        )
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{
            $push:{
                subSection:subsection._id
            }
        },
        {new:true})
    // ).populate("subSection").exec();
       
    return res.status(200).json({
        success:true,
        message:"Sub Section Created Successfully",
        subsection
    })

    }
    catch(error){
        
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while creating SubSection"
        })
    }
}

exports.updateSubSection = async(req,res)=>{
    try{
        const { newTitle, newDescription , newTimeDuration , subsectionId} = req.body;
        const newVideoFile = req.files?.videoFile
        if(!subsectionId){
            return res.status(400).json({
                success:false,
                message:"Subsection ID is required to update details"
            }) 
        }
          let Video = null;
           if(newVideoFile) 
           Video = await uploadImage(newVideoFile , process.env.FOLDER_NAME  );
       


        
         const updateData = {
                       title: newTitle,
                      description: newDescription,
                         timeDuration: newTimeDuration     
                     };

                   if (Video) {
                     updateData.videoUrl = Video.secure_url;
                    }

                           const updatedSubSection = await SubSection.findByIdAndUpdate(
                                    subsectionId,
                                 updateData,
                                  { new: true }
                                 );

         return  res.status(200).json({
            success:true,
            message:"Subsection updated Successfully",
            updatedSubSection
         }) 


    }
    catch(error){
      console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while updating SubSection"
        })   
    }
}

exports.deleteSubSection = async(req,res) =>{
    try{
     const {subsectionId ,sectionId } = req.body;
     if(!subsectionId || !sectionId){
    return res.status(400).json({
                success:false,
                message:"Unable to fetch Subsection/Section ID "
            })
     }

     const response  = await SubSection.findByIdAndDelete(subsectionId);
     if(!response){
        return res.status(404).json({
                success:false,
                message:"Subsection doesn't exist "
            })
     }
     const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
        {
            $pull:{
                subSection:subsectionId
            }
        },
        {new:true}
     )
      if(!updatedSection){
    return res.status(400).json({
                success:false,
                message:"Unable to Delete Subsection or Subsection doesn't exist "
            })
     }

     return res.status(200).json({
        success:true,
        message:"Subsection successfully Deleted"
     }) 
    }
    catch(error){
      console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while deleting SubSection"
        }) 
    }
}

exports.getAllSubsections = async(req,res) =>{
    try{
     const {sectionId } = req.body;
     if(!sectionId){
    return res.status(400).json({
                success:false,
                message:"Unable to fetch Section "
            })
     }

     const response  = await Section.findById(sectionId).populate("subSection").exec();
     if(!response){
        return res.status(404).json({
                success:false,
                message:"Subsection doesn't exist"
            })
     }
       const subsections = response.subSection
    

     return res.status(200).json({
        success:true,
        message:"Subsections Fetched",
        subsections
     }) 
    }
    catch(error){
      console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while fetching SubSection"
        }) 
    }
}


exports.getSubsection = async(req,res) => {
    try{
      const {subsectionId} = req.body;
      const Subsection = await SubSection.findById(subsectionId)
      if(!Subsection){
        return res.status(404).json({
            success:false,
            message:"Subsection can't be Found"
        })
      }
      res.status(200).json({
        success:true,
        Subsection
      })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while fetching SubSection"
        })  
    }
}