import { useEffect, useState } from "react";
import { GetCourse, getAvgRating, getCourseRatings } from "../../../services/ApiInstance"
import ReactStars from "react-stars";
import Globe from "../../../assets/globe.png"
import { useNavigate, useParams } from "react-router-dom";
import dropdown from "../../../assets/dropdown.png"
import monitor from "../../../assets/monitor.png"
import protection from "../../../assets/protection.png"
import mobile from "../../../assets/smartphone.png"
import certificate from "../../../assets/certificate.png"
import { useDispatch, useSelector } from "react-redux";
import { addCourse, removeCourse } from "../../../Redux/slices/Cart";
import { toast } from "react-toastify";
import ReviewCard from "../../Common/ReviewCard";
import AnimatedSection from "../../Common/AnimatedSection";
import { motion } from "framer-motion";

function Card(){
    const token = useSelector((state) => (state.auth.token))
    const AllCourses  = useSelector((state) => (state.Cart.Courses))
    const accountType = useSelector((state) => (state.account.accountType))
    const dispatch = useDispatch()
    const [COURSE , setCourse] = useState({});
    const [avgRating, setAvgRating] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);
    const [reviews, setReviews] = useState([]);
    const {courseId}  = useParams()
    const navigate  = useNavigate()

 async function courseDetails() {
    const DATA = {
        courseId: courseId
    }
    try{
        const result  = await GetCourse(DATA);
        if(result.data.success){
            setCourse(result.data.Courses);
        }

        const ratingResult = await getAvgRating(DATA);
        if (ratingResult.data.success) {
          setAvgRating(ratingResult.data.averageRating || 0);
        }

        const reviewsResult = await getCourseRatings(DATA);
        if (reviewsResult.data.success) {
          const courseReviews = reviewsResult.data.allRatings?.ratingAndreview || [];
          setReviews(courseReviews);
          setReviewCount(courseReviews.length);
        }
    }
    catch(error){
     console.log(error)
    }
 }
 useEffect(()=>{
    courseDetails()
 } , [courseId])

 let totalLectures = 0;
 COURSE.courseContent?.forEach((section) => {
   totalLectures += section?.subSection?.length || 0;
 });

    return(
       
              <div className="w-full pt-13 bg-[rgb(3,1,29)] pb-10">
            <AnimatedSection>
            <div className="w-full bg-gray-800 py-5">
                <div className="w-10/12 mx-auto flex md:flex-row flex-col gap-y-2 items-center gap-x-5 justify-evenly">
                    <div className="flex flex-col justify-evenly gap-y-2">
                        <h1 className="text-sm text-gray-500 ">Home / Catalogue / <span className="text-yellow-300">{COURSE.Category?.name}</span> </h1>
                        <h1 className="text-2xl font-bold text-white">{COURSE.courseName}</h1>
                        <p className="text-gray-500">{COURSE.courseDescription}</p>
                        <div className="flex items-center justify-start gap-x-1"><ReactStars
                      count={5}
                          value={avgRating}   
                           size={20}
                          edit={false}       
                            isHalf={true}
                        activeColor="#facc15"
                          />
                          <h1 className="text-white text-sm relative top-[2px]">{`(${reviewCount} reviews)`}</h1>
                          </div>
                         <h1 className="text-sm font-bold text-white"><span className="text-xs text-gray-600">Created By</span> {COURSE.instructor?.firstName} {COURSE.instructor?.lastName} </h1> 
                          <div className="flex justify-start items-center  gap-x-1">
                            <img className="w-[15px] invert  object-contain" src={Globe} alt="" />
                            <h1 className="text-gray-500 text-sm ">English  </h1>
                          </div>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="lg:w-[400px] h-fit rounded-md flex flex-col gap-y-1 bg-gray-700 pb-3 "
                        >
                            <img  className=" rounded-md" src={COURSE.thumbnailUrl} alt="" />
                            <h1  className=" italic text-sm font-bold text-white text-center">Rs. {COURSE.price}</h1>
                            <button onClick={() => {
                                if(accountType === "Student" && token !== null){
                                    if(AllCourses.includes(COURSE._id)){
                                    dispatch(removeCourse(COURSE._id))
                                    toast.info("Removed from wishlist")
                                  }
                                  else{
                                    dispatch(addCourse(COURSE._id))
                                     toast.success("Course Added to Wishlist")
                                  }
                                }
                                else{
                                   navigate("/Login")
                                }
                            }} className={`bg-yellow-300 px-2 py-1 w-10/12 text-xs font-bold mx-auto text-black  rounded-md text-center cursor-pointer hover:scale-95 transition duration-300`}>{`${AllCourses.includes(COURSE._id)?'Remove from Wishlist':'Add to Wishlist' } `}</button>
                            <button onClick={() => {
                              if(accountType === "Student" && token !== null){
                                    dispatch(addCourse(COURSE._id))
                                    navigate("/Student/Dashboard/Wishlist")
                                }
                                else{
                                   navigate("/Login")
                                }
                            }} className={`bg-gray-950 text-white w-10/12 mx-auto  text-xs font-bold px-2 py-1 rounded-md text-center cursor-pointer hover:scale-95 transition duration-300`}>Enroll Now</button>
                            <h1 className="text-center text-xs italic text-gray-400"><span className="text-red-500">*</span> Direct enrollment — payment integration coming soon</h1>
                            <div className="ml-2">
                                <h1 className="text-gray-300 text-sm font-bold mb-2">This Course Includes :-</h1>
                                <ul className="flex flex-col gap-y-2">
                                    <li>
                                        <div className="flex text-green-500 gap-x-1 text-xs font-semibold">
                                            <img className="w-[15px] object-contain invert" src={protection} alt="" />
                                            <p >Full Lifetime Access</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex text-green-500 gap-x-1 text-xs font-semibold">
                                            <img className="w-[15px] object-contain invert" src={mobile} alt="" />
                                            <p >Mobile and TV Access</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex text-green-500 gap-x-1 text-xs font-semibold">
                                            <img className="w-[15px] object-contain invert" src={certificate} alt="" />
                                            <p >Certificate on completion</p>
                                        </div>
                                    </li>
                                    
                                </ul>
                            </div>
                        </motion.div>
                   
                </div>

            </div>
            </AnimatedSection>
              
              <AnimatedSection delay={0.1}>
              <div className="md:w-5/12 w-10/12 py-5 px-2 flex flex-col gap-y-1 mx-auto border-gray-600 rounded-md border mt-10 mb-5 ">
                 <h1 className="text-lg underline font-bold text-center text-white ">What You Will Learn</h1>
                 <div className="text-white text-center font-semibold">
                    {COURSE.whatYouWillLearn}
                 </div>
              </div>
              </AnimatedSection>

              <div className="w-10/12 mx-auto flex flex-col gap-y-2">
                <AnimatedSection>
                <h1 className="text-xl font-bold text-white text-left">Course Content</h1>
                <p className="text-xs italic text-white text-left "> • {COURSE.courseContent?.length} Sections • {totalLectures} Lectures</p>
                </AnimatedSection>
                <div>
                    <ul className="w-full">
                        {
                            COURSE.courseContent?.map((section, sIndex) => 
                            (
                                <AnimatedSection key={section._id} delay={sIndex * 0.05}>
                                <li className="text-md w-full font-bold text-white bg-gray-600 px-2 border border-gray-400 group cursor-pointer mb-2">
                                    <div className="flex justify-between items-center px-1 py-2">
                                     <div className="flex gap-x-2">   
                                        <img className="invert w-[20px] object-contain group-hover:rotate-180 transition duration-300" src={dropdown} alt="" />
                                    <h1 className="text-white text-sm">{section?.sectionName}</h1>
                                    </div>
                                    <h2 className="text-amber-300 text-sm">{section?.subSection?.length} lectures</h2>
                                    </div>
                                    <div className={`bg-[rgb(3,1,29)]
                                                   md:overflow-hidden
                                                    md:max-h-0
                                                  md:opacity-0
                                                 md:transition-all
                                                 md:duration-500
                                                 md:ease-in-out
                                                md:group-hover:max-h-[500px]
                                                     md:group-hover:opacity-100`}>
                                        <ul>
                                        {
                                           
                                            section?.subSection?.map((subsection) =>
                                            (
                                                <li key={subsection._id} className="text-white text-sm px-2 py-2 font-bold">
                                                    <div className="flex justify-between gap-x-2 group">
                                                        <div className="flex gap-x-1">
                                                     <img className="w-[15px] invert object-contain" src={monitor} alt="" />   
                                                    <h1>{subsection.title}</h1> 
                                                    </div>
                                                    <h2 className="text-xs self-end">{subsection.timeDuration}</h2>
                                                    </div>
                                                    </li>
                                            )
                                            )
                                         
                                        }
                                        </ul>
                                    </div>
                                </li>
                                </AnimatedSection>
                            )
                            )
                        }
                    </ul>
                </div>

                <AnimatedSection delay={0.1}>
                <div className="w-full mx-auto mt-10 flex flex-col gap-y-1">
                    <h1 className="text-xl font-bold text-white mb-2">AUTHOR</h1>
                    <div className="flex gap-x-5 items-center justify-start" >
                        <img className="w-[45px] h-[45px] rounded-full " src={COURSE.instructor?.imgURL} alt="" />
                        <h1 className="text-sm font-bold text-white">{COURSE.instructor?.firstName} {COURSE.instructor?.lastName}</h1>
                        <p className="text-xs text-gray-500 text-left" >{COURSE.instructor?.additionalDetails?.About}</p>
                    </div>
                </div>
                </AnimatedSection>

                {reviews.length > 0 && (
                  <div className="w-full mx-auto mt-10 flex flex-col gap-y-4">
                    <h1 className="text-xl font-bold text-white">Student Reviews</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {reviews.map((review, index) => (
                        <ReviewCard 
                          key={review._id} 
                          review={review} 
                          index={index} 
                          compact 
                          onDeleteSuccess={(reviewId) => {
                            setReviews(prev => prev.filter(r => r._id !== reviewId));
                            setReviewCount(prev => Math.max(0, prev - 1));
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              

            </div>
        
    )
}

export default Card
