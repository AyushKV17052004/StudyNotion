import { useEffect, useState, useRef } from "react";
import wlcm from "../../../assets/WelcomeCourse.jpg"
import { getSubsection, markVideoComplete, GetCourse } from "../../../services/ApiInstance";
import ReviewCard from "./AddReview";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

function Card({activeSubsection , setReviewPopup , ReviewPopup, courseId}){

    const [Subsection , setSubsection] = useState(null);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [isCompleted, setIsCompleted] = useState(false);
    const [loading, setLoading] = useState(false);
    const videoRef = useRef(null);
    const welcomeShown = useRef(false);
    
    async function getsubsection() {
        try{
            const Data = { subsectionId: activeSubsection }
            const result = await getSubsection(Data);
            if(result.data.success){
               setSubsection(result.data.Subsection);
               setIsCompleted(false);
               setPlaybackRate(1);
               // Show welcome toast only on first lecture
               if (!welcomeShown.current) {
                 welcomeShown.current = true;
                 toast(
                   <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                     <span style={{ fontSize: 22 }}>🚀</span>
                     <div>
                       <p style={{ fontWeight: 700, margin: 0, fontSize: 13 }}>Welcome to the course!</p>
                       <p style={{ margin: 0, fontSize: 11, color: "#a3e635" }}>Let's start learning – first up: <strong>{result.data.Subsection.title}</strong></p>
                     </div>
                   </div>,
                   { icon: false, style: { background: "#1e293b", color: "#f1f5f9", border: "1px solid rgba(99,102,241,0.4)" } }
                 );
               }
            }
        }
        catch(error){
            console.log(error)
        }
    }

    async function handleVideoEnd() {
      if (!courseId || !activeSubsection || isCompleted || loading) return;
      setLoading(true);
      try {
        const res = await markVideoComplete({
          courseId,
          subsectionId: activeSubsection
        });
        if (res.data.success) {
          setIsCompleted(true);
          toast.success("Lesson marked as completed! 🎉");
        }
      } catch (error) {
        console.log(error);
        toast.error("Could not update progress");
      } finally {
        setLoading(false);
      }
    }

    const changeSpeed = (rate) => {
      setPlaybackRate(rate);
      if (videoRef.current) {
        videoRef.current.playbackRate = rate;
      }
      toast.info(`Playback speed set to ${rate}x`);
    };

  useEffect(() => {
    if(activeSubsection)
    getsubsection()
  } , [activeSubsection])

  useEffect(() => {
    if (videoRef.current && Subsection) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [Subsection]);

  if (!Subsection) return(
    <div className={`flex md:justify-center justify-start items-center w-full min-h-screen md:mt-0 mt-5 flex-col gap-y-4 px-6` }>
      <motion.img 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`${ReviewPopup===true? "blur-[3px]":"blur-none"} w-10/12 md:max-w-2xl object-cover border border-slate-800 rounded-xl shadow-2xl`} 
        src={wlcm} 
        alt="Welcome" 
      />
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="md:text-xl text-md text-slate-400 font-semibold tracking-wide text-center"
      >
        Click a lecture on the left to load content
      </motion.h1>     
      <div className={`${ReviewPopup===true? "":"hidden"} w-full flex justify-center items-center`}>
        <ReviewCard setReviewPopup={setReviewPopup} ReviewPopup={ReviewPopup}></ReviewCard>
      </div>
    </div>
  )
  
    return(
        <div className="w-full z-10 p-6 flex flex-col gap-y-6">
           <div className={`${ReviewPopup===true? "":"hidden"} w-full flex justify-center items-center`}>
             <ReviewCard setReviewPopup={setReviewPopup} ReviewPopup={ReviewPopup}></ReviewCard>
           </div>
           
            <div className={`${ReviewPopup===true? "blur-[3px]":"blur-none"} flex flex-col gap-y-4 w-full max-w-4xl mx-auto`}>
                
                {/* Title & Info Header */}
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-y-2 text-left bg-slate-900/40 p-4 rounded-xl border border-slate-800/80 backdrop-blur-sm"
                >
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <h1 className="text-xl font-extrabold text-white tracking-tight">{Subsection.title}</h1>
                      <div className="flex gap-2">
                        {isCompleted ? (
                          <span className="bg-green-500/20 text-green-400 text-xs px-2.5 py-1 rounded-full border border-green-500/30 font-semibold">
                            Completed ✓
                          </span>
                        ) : (
                          <span className="bg-blue-500/20 text-blue-400 text-xs px-2.5 py-1 rounded-full border border-blue-500/30 font-semibold">
                            In Progress
                          </span>
                        )}
                        <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-full border border-slate-700 font-semibold">
                          ⏱ {Subsection.timeDuration || "Duration N/A"}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mt-1">
                        {Subsection.description}
                    </p>
                </motion.div>

                {/* Custom Styled Video Wrapper */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="relative group rounded-xl overflow-hidden border border-slate-850 shadow-2xl bg-slate-950"
                >
                    <video
                      ref={videoRef}
                      className="w-full aspect-video"
                      preload="metadata"
                      controls
                      src={Subsection.videoUrl}
                      onEnded={handleVideoEnd}
                    ></video>
                </motion.div>

                {/* Additional Controls Bar */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap justify-between items-center gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800/60 backdrop-blur-md"
                >
                  {/* Speed Controller */}
                  <div className="flex items-center gap-x-2">
                    <span className="text-xs font-semibold text-slate-400">Speed:</span>
                    <div className="flex bg-slate-950/80 p-0.5 rounded-lg border border-slate-800">
                      {[0.5, 1, 1.25, 1.5, 2].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => changeSpeed(rate)}
                          className={`text-xs px-2.5 py-1.5 rounded-md font-bold transition duration-200 cursor-pointer ${
                            playbackRate === rate
                              ? "bg-yellow-400 text-black shadow-md"
                              : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Manual Mark Complete Button */}
                  <div className="flex gap-x-2">
                    <button
                      onClick={handleVideoEnd}
                      disabled={isCompleted || loading}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition duration-300 shadow-lg cursor-pointer ${
                        isCompleted
                          ? "bg-green-600/30 text-green-400 border border-green-500/20 cursor-default"
                          : "bg-yellow-400 hover:bg-yellow-300 text-black hover:scale-95 disabled:opacity-50"
                      }`}
                    >
                      {loading ? "Saving..." : isCompleted ? "Completed ✓" : "Mark as Completed"}
                    </button>
                  </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Card;
