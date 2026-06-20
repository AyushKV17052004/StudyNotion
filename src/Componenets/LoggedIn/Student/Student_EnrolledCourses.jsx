import { useEffect, useState } from "react"
import { completedCourse, GetCourse, getEnrolled } from "../../../services/ApiInstance";
import EnrolledCourseCard from "./EnrolledCourseCard"
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import dots from "../../../assets/more.png"
import Bar from "./Progressbar"
import loading from "../../../assets/loading.png"
import AnimatedSection from "../../Common/AnimatedSection";

function Card(){
  const [active , setActive] = useState("All");
  const [Popup , setPopup] = useState("")
  const [AllCourses , setCourses] = useState([]);
  const [progressMap , setProgressMap] = useState({});
  const [durationMap , setDurationMap] = useState({});
  const token  = useSelector((state) => (state.auth.token));
  const accountType  = useSelector((state) => (state.account.accountType))

  async function EnrolledCourses() {
    try{
        const result  = await getEnrolled();
        if(result.data.success){
           const courses = result.data.Student.Courses || [];
           const progressions = result.data.Student.CourseProgression || [];
           setCourses(courses)

           const progressByCourse = {};
           progressions.forEach((prog) => {
             if (prog?.courseID) {
               progressByCourse[prog.courseID.toString()] = prog.percentage || 0;
             }
           });
           setProgressMap(progressByCourse);

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
                   [course._id]: hours > 0 ? `${hours}h ${mins}min` : `${mins}min`
                 }));
               }
             } catch (err) {
               console.log(err);
             }
           });
        }
    }
    catch(error){
        console.log(error)
    }
  }

  async function handleMarkComplete(courseId) {
    try {
      const result = await completedCourse({ courseId });
      if (result.data.success) {
        toast.success("Course marked as completed!");
        setProgressMap((prev) => ({ ...prev, [courseId]: 100 }));
        setPopup("");
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to mark complete");
    }
  }

  useEffect(() => {
   if(token && accountType==="Student")
    EnrolledCourses()
  } , [token, accountType])

  const filteredCourses = AllCourses.filter((course) => {
    const progress = progressMap[course._id?.toString()] || 0;
    if (active === "Complete") return progress >= 100;
    if (active === "Pending") return progress < 100;
    return true;
  });

    return(
        <div>
               <div className="flex flex-col justify-between items-start  w-full px-9 mx-auto">
            <AnimatedSection>
            <div className="flex flex-col  py-2 justify-evenly  gap-y-2">
                <p className="text-gray-600 text-sm">Home / Dashboard / <span className="text-yellow-400 text-md">Enrolled Courses</span></p>
            </div>
            <div className="flex justify-start px-2 text-white text-xl font-bold ">
                <h1>Enrolled Courses</h1>
            </div>
            </AnimatedSection>
             
             <AnimatedSection delay={0.1}>
             <div className="flex justify-evenly item-center  bg-gray-800 rounded-2xl px-1 py-1 mt-5">
                <button onClick={() => setActive("All")} className={`text-gray-400 text-xs font-bold px-2 py-1 rounded-2xl cursor-pointer transition duration-300 ${active==="All"?"text-white bg-black":""} `}>All</button>
                <button onClick={() => setActive("Pending")} className={`text-gray-400 text-xs font-bold px-2 py-1 rounded-2xl cursor-pointer transition duration-300 ${active==="Pending"?"text-white bg-black":""} `}>Pending</button>
                <button onClick={() => setActive("Complete")} className={`text-gray-400 text-xs font-bold px-2 py-1 rounded-2xl cursor-pointer transition duration-300 ${active==="Complete"?"text-white bg-black":""} `}>Complete</button>
             </div>
             </AnimatedSection>

                <div className="w-12/12 border border-white mx-auto mt-5 px-0 mb-5">
             <table className="w-full ">
             <thead className="bg-gray-400">
                     <tr className="text-left text-white text-[10px] lg:text-lg border-b border-white  ">
                       <th className="lg:w-[60%] w-[50%] px-2">Course Name</th>
                       <th className="lg:w-[20%] w-[25%]">Duration</th>
                       <th className="lg:w-[20%] w-[25%]">Progress</th>
                     </tr>
                 </thead>
                  <tbody>
                   { filteredCourses.length === 0 ? (
                     <tr>
                       <td colSpan="3" className="text-center text-gray-400 py-8 text-sm">
                         No courses in this filter.
                       </td>
                     </tr>
                   ) : filteredCourses.map((course) => {
                    const progress = progressMap[course._id?.toString()] || 0;
                    return (
                    <tr key={course._id} className="text-left text-white text-[8px] lg:text-sm border-b border-white hover:bg-gray-900/30 transition duration-300">
                       <td className="lg:w-[60%] w-[50%]  px-2" > <EnrolledCourseCard course={course}></EnrolledCourseCard></td>
                       <td className="lg:w-[20%] w-[25%]  ">{durationMap[course._id] || "—"}</td>
                       <td className="lg:w-[20%] w-[25%]  "> <div className="flex  relative z-10"> <div className="w-full"> <h1 className="lg:text-[10px]  text-gray-400 mb-1">Progress - {progress}%</h1> <Bar percentage={progress} ></Bar></div> <img onClick={() => {
                        if(Popup === "" || Popup !== course._id)
                        setPopup(course._id);
                        else
                        setPopup("");
                        }} className="invert cursor-pointer w-[20px] object-contain mr-5" src={dots} alt="" /> 
                       
                       <div className={`${Popup===course._id?"":"hidden"} bg-gray-600  gap-y-2 rounded-md flex flex-col justify-evenly items-start left-5 absolute px-2 py-1 text-white text-[10px]  z-50 `}>
                        <div className="flex gap-x-1">
                            <img className="w-[13px] object-contain invert" src={loading} alt="" />
                            <h1 onClick={() => handleMarkComplete(course._id)} className="hover:bg-gray-800 px-2 cursor-pointer rounded-md select-none ">Mark as Completed</h1>
                        </div>
                       </div>
                       
                       </div> </td>
                     </tr>
                    )})}
                  </tbody>
                 </table>
            </div>
             </div>
        </div>
    )
}

export default Card
