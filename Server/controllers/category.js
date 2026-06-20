const Category = require("../models/Category");
const User = require("../models/User");
const Course = require("../models/Course")


exports.createCategory = async(req,res) =>{
    try{
       const {name , description} = req.body;
       if(!name || !description){
          return res.status(401).json({
            success:false,
            message:"Enter all Fields"
        })
       }
      
       const category = await Category.create({
        name:name , description:description
       })
         res.status(200).json({
            success:true,
            message:"Category has been created SuccessFUlly",
        
        })


    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

// Required categories that must always exist to match frontend dropdown
const REQUIRED_CATEGORIES = [
    { name: "WebDev", description: "Web Development courses" },
    { name: "Python", description: "Python Programming courses" },
    { name: "DevOps", description: "DevOps and Infrastructure courses" },
    { name: "AI|ML", description: "Artificial Intelligence and Machine Learning courses" },
    { name: "Operating System", description: "Operating Systems and core CS concepts" }
];

async function ensureCategories() {
    // Upsert each required category by name – inserts only if that exact name is missing
    for (const cat of REQUIRED_CATEGORIES) {
        await Category.updateOne(
            { name: cat.name },
            { $setOnInsert: { name: cat.name, description: cat.description } },
            { upsert: true }
        );
    }
}

exports.getAllCategory = async(req,res)=>{
    try{
       // Always guarantee correct categories exist before returning
       await ensureCategories();

       const response = await Category.find({},{name:true , description:true});

       res.status(200).json({
        success:true,
        message:"All category are Fetched Successfully",
        response
       })
       
    }
    catch(error){
         console.log(error);
        return res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

exports.categoryPageDetails = async(req,res) =>{

    try{
        const {categoryId} = req.body;
        if(!categoryId){
            return res.status(400).json({
                success:false,
                message:"Couldnt fetch Category ID"
            })
        }

        const SameCategory = await Category.findById({_id:categoryId}).populate(
            {
                path:"course",
                match: { status: "Published" },
                select:"courseName thumbnailUrl courseDescription price status instructor whatYouWillLearn Category",
                populate:[
                    {
                        path:"instructor",
                        select:"firstName lastName imgURL"
                    },
                    {
                        path:"ratingAndreview",
                    }
                ]
            }
        ).exec()

        if(!SameCategory){
            return res.status(404).json({
                success:false,
                message:"Couldn't find courses related to asked Category"
            })
        }
        const diffCategory = await Category.find({_id:{$ne: categoryId}}).populate(
            {
                path:"course",
                match: { status: "Published" },
                select:"courseName thumbnailUrl courseDescription price status instructor whatYouWillLearn Category",
                populate:[
                    {
                        path:"instructor",
                        select:"firstName lastName imgURL"
                    },
                    {
                        path:"ratingAndreview",
                    }
                ]
            }
        ).exec()
    

        return res.status(200).json({
            success:true,
            message:"All Courses Fetched Successfully",
            SameCategory,
            diffCategory,
           
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