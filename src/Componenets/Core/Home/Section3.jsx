import Typewriter2 from "./Typewriter2"
import arrow from "../../../assets/arrow.png"
import "@fontsource/fira-code";
import "../../font.css"
import { useNavigate } from "react-router-dom";
import AnimatedSection from "../../Common/AnimatedSection";
import { motion } from "framer-motion";

function Section3(){
     const navigate = useNavigate()
    return(
        <div className="w-full bg-[rgb(3,1,29)] py-20 scroll-smooth ">
            <div className="w-10/12 flex mx-auto lg:flex-row-reverse flex-col gap-y-10 lg:justify-between  items-center gap-x-5 ">           
                 <AnimatedSection direction="left" className="lg:w-[500px] w-11/12 flex flex-col justify-center items-center lg:items-start gap-y-10">
                <h1 className="text-4xl font-bold text-white text-left">Start <span className="text-blue-400"> coding in seconds</span></h1>
                <p className="text-md text-white font-bold text-wrap text-left">Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.</p>
                <div className="flex flex-row justify-center items-center gap-x-5 ">
                    <motion.button whileHover={{ scale: 0.9 }} onClick={() => navigate("/Signup")} className="px-5 bg-yellow-400 py-[4.8px] rounded-md transition duration-500 flex flex-row text-center font-bold cursor-pointer">Continue Lesson<img className="ml-2 object-contain w-[30px] relative bottom-[2px]" src={arrow} alt="" /></motion.button>
                    <motion.button whileHover={{ scale: 0.9 }} onClick={() => navigate("/Signup")} className="px-5 text-white bg-gray-800 py-2 rounded-md transition duration-500 cursor-pointer">Learn More </motion.button>
                </div>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.15} className="lg:w-[500px] w-11/12 h-[300px] max-[500px]:h-[410px] px-2 py-1 border-2 bg-gray-800/20 backdrop-blur-lg border-white/20 flex flex-row justify-start items-center">
              <div className="w-[300px] h-[230px] rounded-full shadow-2xl bg-gradient-to-b from-[#06b6d4] via-[#2563eb] to-[#6366f1] blur-2xl brightness-50 absolute">
              </div>
               <div className="code-font scale-90 h-[250px] flex flex-col items-center text-gray-600 brightness-125 max-[500px]:hidden">
                <p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p>
               </div>
             <div className="code-font w-[400px] scale-90 text-blue-500 brightness-160 h-[250px] max-[500px]:h-[400px]">
               <Typewriter2></Typewriter2>
               </div>
            </AnimatedSection>
            </div>
        </div>
    )
}

export default Section3
