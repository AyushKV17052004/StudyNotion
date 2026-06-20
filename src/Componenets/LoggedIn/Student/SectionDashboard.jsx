import { useEffect, useState } from "react"
import { getAllSections, GetCourse, getMyReviewForCourse, deleteRating } from "../../../services/ApiInstance";
import { useParams } from "react-router-dom";
import monitor from "../../../assets/monitor.png"
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaStar, FaPlus } from "react-icons/fa";

function Card({setActive , setReviewPopup , ReviewPopup}){
    const {courseId} = useParams();
    const [AllSections , setSection] = useState([]);
    const [courseName, setCourseName] = useState("");
    const [subsectioncard , setCard] = useState("")
    const [myReview, setMyReview] = useState(null);
    const [deletingReview, setDeletingReview] = useState(false);

    async function getSections(){
        try{
            const Data = { courseId: courseId }
            const result = await getAllSections(Data);
            if(result.data.success){
                setSection(result.data.AllSection.courseContent)
            }

            const courseResult = await GetCourse({ courseId });
            if (courseResult.data.success) {
              setCourseName(courseResult.data.Courses.courseName);
            }
        }
        catch(error){
            console.log(error)
        }
    }

    async function fetchMyReview() {
        try {
            const result = await getMyReviewForCourse(courseId);
            if (result.data.success) {
                setMyReview(result.data.review || null);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDeleteReview() {
        if (!myReview || deletingReview) return;
        setDeletingReview(true);
        try {
            const result = await deleteRating(myReview._id);
            if (result.data.success) {
                toast.success("Review deleted successfully!");
                setMyReview(null);
            }
        } catch (error) {
            const msg = error?.response?.data?.message || "Could not delete review";
            toast.error(msg);
        } finally {
            setDeletingReview(false);
        }
    }

useEffect(() => {
    getSections()
    fetchMyReview()
} , [courseId])

    return(
        <div className={`${ReviewPopup === true? "blur-[1px]":""} md:w-[250px] w-full self-start min-h-screen left-0 flex flex-col items-start gap-y-1 py-6 bg-gray-800`}>
            <div className="flex flex-col w-11/12 mx-auto ">
                <h1 className="text-md font-bold text-white mb-3 line-clamp-2">{courseName || "Course"}</h1>

                {/* Review Actions */}
                <div className="flex flex-col gap-y-2 mb-4">
                    <AnimatePresence mode="wait">
                        {!myReview ? (
                            <motion.button
                                key="add-review"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                onClick={() => setReviewPopup(true)}
                                className="flex items-center justify-center gap-x-1.5 bg-yellow-300 rounded-md px-2 py-1.5 text-black text-xs cursor-pointer hover:bg-yellow-400 transition duration-200 font-semibold w-full"
                            >
                                <FaPlus size={10} />
                                Add Review
                            </motion.button>
                        ) : (
                            <motion.div
                                key="my-review"
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                className="flex flex-col gap-y-1.5 bg-slate-900/70 rounded-lg p-2.5 border border-slate-700/50"
                            >
                                <div className="flex items-center gap-x-1 text-yellow-400">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <FaStar
                                            key={i}
                                            size={10}
                                            className={i < myReview.rating ? "text-yellow-400" : "text-gray-600"}
                                        />
                                    ))}
                                    <span className="text-yellow-400 text-[10px] font-bold ml-1">{myReview.rating}/5</span>
                                </div>
                                <p className="text-gray-300 text-[10px] leading-relaxed line-clamp-2">
                                    "{myReview.review}"
                                </p>
                                <motion.button
                                    onClick={handleDeleteReview}
                                    disabled={deletingReview}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center justify-center gap-x-1.5 bg-red-600/80 hover:bg-red-500 text-white text-[10px] rounded-md px-2 py-1.5 cursor-pointer transition duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed w-full mt-1"
                                >
                                    <FaTrash size={9} />
                                    {deletingReview ? "Deleting..." : "Delete My Review"}
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                  <ul className="flex flex-col gap-y-4">
                 {   AllSections.map((section) => (
                    <div key={section._id}>
                       <li onClick={() => {
                        if(subsectioncard === "" || subsectioncard !== section._id){
                            setCard(section._id)
                        }
                        else{
                            setCard("")
                        }
                       }} className="flex md:flex-row flex-col gap-y-1 justify-between items-center cursor-pointer text-[10px] bg-gray-300 rounded-md text-gray-900 px-1 py-1 hover:bg-gray-200 transition duration-300">
                         <h1 className="select-none" >{section.sectionName}</h1>
                         <div className="flex gap-x-1 justify-center items-center ">
                            <h1>{section?.subSection?.length} lectures</h1>
                            <h1 className={`font-bold transition duration-300 ${subsectioncard === section._id?"rotate-90":""} `}>{`>`}</h1>
                         </div>
                       </li>
                       
                          <div className={`bg-gray-800 transition duration-500 flex flex-col mt-1 justify-evenly gap-y-1 ${subsectioncard === section._id?"block":"hidden"} `}>
                         {section?.subSection?.map((subsection) => (
                                  <div key={subsection._id} onClick={() => setActive(subsection._id)} className="hover:bg-black hover:rounded-md py-1 px-1 flex gap-x-1 cursor-pointer select-none items-center transition duration-300">
                                    <img className="invert w-[10px] object-contain" src={monitor} alt="" />
                                    <h1 className="text-[10px] text-white">{subsection.title}</h1>
                                 </div>
                            ))}
                             </div>
                       </div> 
                    ))
                }</ul>
            </div>
        </div>
    )
}
export default Card
