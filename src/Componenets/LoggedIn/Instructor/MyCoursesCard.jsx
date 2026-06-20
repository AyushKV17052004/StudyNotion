import { useSelector } from "react-redux";
import add from "../../../assets/add.png"
import { deleteCourse, getInstructorCourses, GetCourse } from "../../../services/ApiInstance";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InstructorCard from "./CourseCreatedCard"
import pen from "../../../assets/pen.png"
import del from "../../../assets/delete.png"
function Card({step ,setStep , setCourseId , setActive}) {

  const userID  = useSelector((state) => (state.account.userID))
  const [allCourses , setAllCourses] = useState([])
  const [durationMap, setDurationMap] = useState({})

async function CourseDelete(courseId) {

  try{
    const DATA = {
      courseId : courseId
    }
    const result = await deleteCourse(DATA)

    if(result.data.success){
      setAllCourses((prev) => 
        prev.filter((course) => course._id !== courseId)
      )
      toast.success("Course Deleted Successfully");
    }
  }
  catch(error){
    console.log(error);
  }
  
}




  async function InstructorCourses() {

    try{
      
      const result  = await getInstructorCourses();
      if(result.data.success){
        const courses = result.data.Courses;
        setAllCourses(courses);
        if(courses.length>0) {
          toast.success("Courses Fetched Successfully")
          
          courses.forEach(async (course) => {
            try {
              const courseResult = await GetCourse({ courseId: course._id });
              if (courseResult.data.success) {
                const courseData = courseResult.data.Courses;
                let totalMinutes = 0;
                courseData.courseContent?.forEach((section) => {
                  section.subSection?.forEach((sub) => {
                    const match = sub.timeDuration?.match(/(\d+)/);
                    if (match) totalMinutes += parseInt(match[1], 10);
                  });
                });
                const hours = Math.floor(totalMinutes / 60);
                const mins = totalMinutes % 60;
                setDurationMap((prev) => ({
                  ...prev,
                  [course._id]: hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
                }));
              }
            } catch (err) {
              console.log(err);
            }
          });
        }
      }
    }
    catch(error){
     console.log(error);
    const errorMessage =
     error?.response?.data?.message || "Something went wrong!";
           
    toast.error(errorMessage);  
    }
    
  }

  useEffect(() => {
    if(step===0)
    InstructorCourses();
  } , [userID , step])

    return (
        <div>
            <div className="flex flex-row justify-between items-center  w-full px-9 mx-auto">
            <div className="flex flex-col  py-2 justify-evenly  gap-y-2">
                <p className="text-gray-600 text-sm">Home / Dashboard / <span className="text-yellow-400 text-md">My Courses</span></p>
                <h1 className="text-2xl  font-bold text-white">My Courses</h1>
            </div>
            <div onClick={() => {
                setStep(1);
            }} className="flex gap-x-1 justify-center items-center px-3 py-2 hover:brightness-90 cursor-pointer bg-yellow-400 rounded-md text-black">
             <img className=" w-[20px] object-contain" src={add} alt="" />
            <button >New</button>
            </div>
            </div>
           <div className="w-11/12 border border-white mx-auto rounded-md mt-10 px-2 mb-5">
             <table className="w-full">
             <thead>
                     <tr className="text-left text-white text-xs lg:text-lg border-b border-white">
                       <th className="lg:w-[60%] w-[80%]">Course</th>
                       <th className="lg:w-[15%] w-[7%]">Duration</th>
                       <th className="lg:w-[15%] w-[7%]">Price</th>
                        <th className="lg:w-[10%] w-[6%]">Actions</th>
                     </tr>
                 </thead>
                  <tbody>
  {
    allCourses.length !== 0 ? (
      allCourses.map((course) => (
        <tr key={course._id} className="border-b border-gray-600">
          <td>
            <InstructorCard course={course} />
          </td>
          <td className="text-white text-xs lg:text-sm">{durationMap[course._id] || "0m"}</td>
          <td className="text-white text-xs lg:text-sm">{course.price}</td>
          <td>
            <div className="flex gap-x-1 lg:gap-x-3">
              <img
                onClick={() => {
                  setActive("")
                  setCourseId(course._id);
                  setStep(2);
                }}
                className="lg:w-[15px] w-[10px] object-contain invert cursor-pointer"
                src={pen}
                alt="edit"
              />
              <img onClick={()=>CourseDelete(course._id)}
                className="lg:w-[15px] w-[10px] object-contain invert cursor-pointer"
                src={del}
                alt="delete"
              />
            </div>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td
          colSpan={4}
          className="text-center text-white text-2xl py-10 font-bold"
        >
          No Courses Found
        </td>
      </tr>
    )
  }
</tbody>

                         </table>

           </div>

        </div>
    )
}

export default Card