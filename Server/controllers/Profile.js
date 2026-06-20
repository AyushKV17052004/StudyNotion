const Profile = require("../models/Profile")
const User = require("../models/User")
const {uploadImage} = require("../utils/imageUploader")


exports.ProfileUpdate = async(req,res)=>{
    try{  const UserId = req.User.id
          const {About, DOB, contactNumber, Profession, Gender, firstName, lastName}= req.body;
          
          if(!About && !DOB && !contactNumber && !Profession && !Gender && !firstName && !lastName){
            return res.status(400).json({
                success:false,
                message:"Select at least one parameter to be updated"
            })
          }
       
          const userDetail = await User.findById(UserId);
          if(!userDetail){
            return res.status(404).json({
                success:false,
                message:"User Not Found"
            })
          }
          
          if(firstName) userDetail.firstName = firstName;
          if(lastName) userDetail.lastName = lastName;
          if(firstName || lastName) {
            await userDetail.save();
          }
          
          const ProfileId = userDetail.additionalDetails
    
         
         const updatedProfile = await Profile.findByIdAndUpdate(ProfileId, 
            {
                About, DOB, contactNumber, Profession, Gender 
            }
            ,
            {new:true}
         )
        
         const updatedUser = await User.findById(UserId).populate("additionalDetails").exec();

      return res.status(200).json({
            success:true,
            message:"Profile Updated Successfully",
            updatedProfile,
            user: updatedUser
        })
      

         
           
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
                success:false,
                message:"Unable to Update to profile"
            })
        
    }
}

exports.updateImageAndPass = async(req,res) =>{
    try{  // change pass remaining
         const UserId = req.User.id
      const imgFile = req.files.File;
        let Image;
        if(!imgFile){
            return res.status(400).json({
                success:false,
                message:"Couldnt fetch image user uploaded"
            })
        }
        if(imgFile){
            Image  = await uploadImage(imgFile , process.env.FOLDER_NAME);
         }
      let updatedImage;
         if(Image){
         updatedImage = await User.findByIdAndUpdate(UserId,
            {
                imgURL:Image.secure_url
            },
            {new:true}
         )}
        return res.status(200).json({
            success:true,
            message:"Image Updated Successfully",
            
        })
      

    }
    catch(error){
        console.log(error);
          return res.status(500).json({
                success:false,
                message:"Unable to Update to Image"
            })
        
    }
}

exports.deleteAccount = async(req,res) =>{
    try{
        const UserId = req.User.id

        const user = await User.findById(UserId)
        const ProfileId = user.additionalDetails 
           
  //update enrolled students 

        const response1 =await Profile.findByIdAndDelete(ProfileId)
        const response2  = await User.findByIdAndDelete(UserId)

        return res.status(200).json({
            success:true,
            message:"User Deleted Successfully"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to Delete Account"
        })
    }
}
exports.getProfile = async(req,res) =>{
    try{
        const UserId = req.User.id

        const user = await User.findById(UserId).populate("additionalDetails").exec();
    

       

        return res.status(200).json({
            success:true,
            message:"User Details fetched Successfully",
            user
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to get User Details "
        })
    }
}