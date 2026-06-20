import { useNavigate } from "react-router-dom"
import videoFile from "../../../assets/Home_pageVideo.mp4"
import AnimatedSection from "../../Common/AnimatedSection"
import { motion } from "framer-motion"
import { useRef, useState } from "react"

function Section1(){
    const navigate = useNavigate()
    const sectionRef = useRef(null);
    const [spotlight, setSpotlight] = useState({ x: "50%", y: "50%" });

    function handleMouseMove(e) {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        setSpotlight({
            x: e.clientX - rect.left + "px",
            y: e.clientY - rect.top + "px",
        });
    }

    return(
        <div
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="w-full bg-[rgb(3,1,29)] py-20 relative overflow-hidden"
        >
            {/* Cursor spotlight */}
            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(400px circle at ${spotlight.x} ${spotlight.y}, rgba(99,102,241,0.10) 0%, transparent 70%)`,
                    zIndex: 1,
                }}
            />

            {/* Animated background orbs */}
            <motion.div
                className="absolute top-10 left-10 w-72 h-72 rounded-full pointer-events-none"
                animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.14, 0.08] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    background: "radial-gradient(circle, rgba(99,102,241,0.5), transparent)",
                    filter: "blur(40px)",
                    zIndex: 0,
                }}
            />
            <motion.div
                className="absolute bottom-10 right-10 w-64 h-64 rounded-full pointer-events-none"
                animate={{ scale: [1, 1.2, 1], opacity: [0.07, 0.13, 0.07] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                style={{
                    background: "radial-gradient(circle, rgba(168,85,247,0.5), transparent)",
                    filter: "blur(40px)",
                    zIndex: 0,
                }}
            />

            <div className="mx-auto w-10/12 flex flex-col justify-center items-center relative z-10">
             <AnimatedSection className="flex flex-col justify-center items-center gap-y-5 w-10/12">
                <motion.button
                  whileHover={{ scale: 0.95 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigate("/Signup")}
                  className="px-10 py-1 rounded-2xl border-b-2 border-gray-600 text-gray-400 text-lg bg-gray-900 hover:border-white hover:text-white hover:bg-black cursor-pointer transition duration-500"
                >
                  Become an Instructor
                </motion.button>
                <h1 className="text-4xl font-bold text-white text-center">Empower Your Future with <span className="text-blue-500"> Coding Skills</span></h1>
                <p className="text-md text-gray-500 text-center font-bold">With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.</p>
                <div className="flex flex-row justify-center items-center gap-x-3 mt-5 ">
                    <motion.button whileHover={{ scale: 0.9 }} onClick={() => navigate("/Signup")} className="px-3 py-2 text-lg font-bold text-black bg-yellow-300 rounded-md cursor-pointer transition duration-500">Learn More</motion.button>
                    <motion.button whileHover={{ scale: 0.9 }} onClick={() => navigate("/Signup")} className="px-3 py-2 text-lg font-bold text-white bg-gray-700 rounded-md cursor-pointer transition duration-500">Book a Demo</motion.button>
                </div>
             </AnimatedSection>
             <AnimatedSection delay={0.2}>
             <motion.div
               whileHover={{ scale: 1.01 }}
               className="mt-15 shadow-[-20px_-20px_60px_2px_rgba(135,206,235,0.45)]"
             >
               <video loop muted playsInline autoPlay className="z-20 relative pointer-events-none rounded-md md:shadow-[20px_20px_0_0] shadow-white " src={videoFile}></video>
             </motion.div>
             </AnimatedSection>
            </div>
        </div>
    )
}

export default Section1
