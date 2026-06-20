import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-stars";
import { motion } from "framer-motion";

function Card ({course}){
  const token = useSelector((state) => (state.auth.token)) 
  const navigate  = useNavigate()

  return(
    <motion.div 
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={() => {
        if(token != null){
          navigate(`/Student/Catalogue/Course/${course._id}`);
        }
        else {
          navigate(`/Catalogue/Course/${course._id}`)
        }
      }}  
      className="md:min-w-[285px] min-w-[200px] max-w-[300px] flex flex-col gap-y-3 p-3 bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)] rounded-xl cursor-pointer transition-colors duration-300 snap-start"
    >
      <div className="w-full h-[160px] overflow-hidden rounded-lg bg-slate-950">
        <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" src={course.thumbnailUrl} alt={course.courseName} />
      </div>
      <div className="flex flex-col gap-y-1 flex-1">
        <h1 className="text-white text-sm font-bold text-left line-clamp-1">{course.courseName}</h1>
        <p className="text-gray-400 text-xs text-left line-clamp-2 leading-relaxed">{course.courseDescription}</p>
        <h2 className="text-xs text-yellow-400/80 font-semibold text-left mt-1">
          by {course?.instructor?.firstName || "Unknown"} {course?.instructor?.lastName || "Instructor"}
        </h2>
      </div>
      <div className="flex flex-col gap-y-2 mt-auto pt-2 border-t border-slate-800/80">
        <div className="flex gap-x-2 justify-between items-center"> 
          <div className="flex gap-x-1 items-center">
            <ReactStars
              count={5}
              value={4.5}   
              size={16}
              edit={false}           
              isHalf={true}
              activeColor="#facc15"
            />
            <span className="text-[10px] text-gray-400 font-medium">(4.5)</span>
          </div>
          <span className="text-[10px] text-gray-500 font-semibold">1.2k Students</span>
        </div>
        <h1 className="text-md font-extrabold text-blue-400 text-left">Rs. {course.price}</h1>
      </div>
    </motion.div>
  )
}

export default Card;