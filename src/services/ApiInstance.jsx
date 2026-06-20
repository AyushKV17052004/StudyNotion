import { apiConnector } from "./APICall";
import axios from "axios";
// import { apiConnector } from "./apiConnector";

export const sendOtp = (EmailData) => {
  return apiConnector(
    "POST",
    "/auth/send-otp",
    EmailData
  );
};

export const signup = (finalData) => {
  return apiConnector(
    "POST",
    "/auth/signup",
    finalData
  );
};

export const login = (Data) => {
  return apiConnector(
    "POST",
    "/auth/login",
    Data
  );
};

export const ResetPass = (Data) => {
  return apiConnector(
    "POST",
    "/auth/reset-password-token",
    Data
  );
};

export const ChangePassword = (Data) => {
  return apiConnector(
    "POST",
    "/auth/reset-password",
    Data
  );
};


export const getProfile = () => {
  return apiConnector(
    "GET",
    "/auth/profile",
    
  );
};



export const updateProfile = (DATA) => {
  return apiConnector(
    "PUT",
    "/auth/profile/update",
    DATA
    
  );
};
export const updateImage = (file) => {
  const formData = new FormData();
  formData.append("File", file);

  return apiConnector(
    "PUT",
    "/auth/profile/image",
    formData,
    {
      "Content-Type": "multipart/form-data",
    }
  );
};

export const createCourse = (DATA) => {
  const formData = new FormData();
  formData.append("thumbnail", DATA.thumbnailUrl);
  formData.append("courseName" , DATA.courseName);
  formData.append("courseDescription" , DATA.courseDescription);
  formData.append("Tags" , DATA.Tags);
  formData.append("category" , DATA.category);
  formData.append("whatYouWillLearn" , DATA.whatYouWillLearn);
  formData.append("price" , DATA.price);
  formData.append("instructions" , DATA.instructions);
 


return apiConnector("POST", "/course/create", formData, {
  "Content-Type": "multipart/form-data"
});

};

export const createSection = (Data) => {
 

  return apiConnector(
    "POST",
    "/section/create",
    Data,
  
  );
};

export const deleteSection = (Data) =>{

  return apiConnector(
    "DELETE",
    "/section/delete",
    Data,
  )
}
export const updateSection = (Data) =>{

  return apiConnector(
    "PUT",
    "/section/update",
    Data
  )
}

export const getInstructorCourses = () => {
  return apiConnector(
    "GET",
    "/course/details/createdByInstructor",
     
  );
};
export const getAllSections = (Data) => {
  return apiConnector(
    "POST",
    "/section/getAll",
    Data
     
  );
};
export const createSubsection = (Data) => {

   const formData = new FormData();
  formData.append("title", Data.title);
  formData.append("timeDuration" , Data.timeDuration);
  formData.append("videoFile" , Data.videoFile);
  formData.append("sectionId" , Data.sectionId);
  formData.append("description" , Data.description)
 


return apiConnector("POST", "/subsection/create", formData, {
  "Content-Type": "multipart/form-data"
});

};

export const getSubSections = (Data) => {
  return apiConnector(
    "POST",
    "/subsection/getAll",
    Data
     
  );
};

export const deleteSubSection = (Data) =>{

  return apiConnector(
    "DELETE",
    "/subsection/delete",
    Data,
  )
}

export const deleteCourse = (Data) =>{

  return apiConnector(
    "DELETE",
    "/course/delete",
    Data,
  )
}

export const updateSubsection = (Data) =>{

  const formData = new FormData();
  formData.append("newTitle", Data.title);
  formData.append("newTimeDuration" , Data.timeDuration);
  formData.append("videoFile" , Data.videoFile);
  formData.append("subsectionId" , Data.subsectionId);
  formData.append("newDescription" , Data.description)
 


return apiConnector( "PUT",
    "/subsection/update", formData, {
  "Content-Type": "multipart/form-data"
});
 
}

export const PublishCourse =(Data) =>{
  return apiConnector(
    "PUT",
    "/course/publish",
    Data
  )
}

export const getAllCategories = ()=> {
  return apiConnector(
    "GET",
    "/category/all",

  )
}
export const getAllCourses = () =>{
  return apiConnector(
    "GET",
    "/course/all",

  )
}

export const GetCourse = (Data) =>{
  return apiConnector(
    "POST",
    "/course/details",
    Data
  )
}

export const purchaseCourse = (Data) => {
  return apiConnector(
    "PUT",
    "/course/purchase",
    Data
  )
}

export const getEnrolled = () => {
  return apiConnector(
    "GET",
    "/course/Enrolled"
  )
}

export const completedCourse = (Data) =>{
  return apiConnector(
    "PUT",
    "/course/complete",
    Data
  )
}

export const markVideoComplete = (Data) => {
  return apiConnector(
    "PUT",
    "/course/progress",
    Data
  )
}

export const getAvgRating = (Data) => {
  return apiConnector(
    "POST",
    "/rate/average",
    Data
  )
}

export const getCourseRatings = (Data) => {
  return apiConnector(
    "POST",
    "/rate/course",
    Data
  )
}

export const getAllRatings = () => {
  return apiConnector(
    "GET",
    "/rate/all"
  )
}

export const changePasswordLoggedIn = (Data) => {
  return apiConnector(
    "PUT",
    "/auth/change-password",
    Data
  )
}

export const deleteAccount = () => {
  return apiConnector(
    "DELETE",
    "/auth/profile/delete"
  )
}

export const getCategoryDetails = (Data) => {
  return apiConnector(
    "POST",
    "/category/details",
    Data
  )
}

export const updateCourse = (DATA) => {
  const formData = new FormData();
  if (DATA.thumbnailUrl) {
    formData.append("thumbnail", DATA.thumbnailUrl);
  }
  formData.append("courseId", DATA.courseId);
  formData.append("courseName", DATA.courseName);
  formData.append("courseDescription", DATA.courseDescription);
  formData.append("Tags", DATA.Tags);
  formData.append("category", DATA.category);
  formData.append("whatYouWillLearn", DATA.whatYouWillLearn);
  formData.append("price", DATA.price);
  formData.append("instructions", DATA.instructions || "");

  return apiConnector("PUT", "/course/update", formData, {
    "Content-Type": "multipart/form-data",
  });
};

export const getSubsection = (Data) =>{
  return apiConnector(
    "POST",
    "/subsection/get",
    Data
  )
}

export const rateCourse = (Data) =>{
  return apiConnector(
    "POST",
    "/rate/create",
    Data
  )
}

export const deleteRating = (reviewId) => {
  return apiConnector(
    "DELETE",
    `/rate/delete/${reviewId}`
  );
}

export const getMyReviewForCourse = (courseId) => {
  return apiConnector(
    "POST",
    "/rate/my-review",
    { courseId }
  );
}