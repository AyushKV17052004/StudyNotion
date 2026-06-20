import Typewriter1 from "./Typewriter1"
import arrow from "../../../assets/arrow.png"
import "@fontsource/fira-code";
import "../../font.css"
import { useNavigate } from "react-router-dom";
import AnimatedSection from "../../Common/AnimatedSection";
import { motion } from "framer-motion";

function Section2(){
     const navigate = useNavigate()
    return(
        <div className="w-full bg-[rgb(3,1,29)] py-20 scroll-smooth ">
            <div className="w-10/12 flex mx-auto lg:flex-row flex-col gap-y-10 lg:justify-between  items-center ">           
                 <AnimatedSection direction="right" className="lg:w-[500px] w-11/12 flex flex-col justify-center items-center lg:items-start gap-y-10">
                <h1 className="text-4xl font-bold text-white text-left">Unlock your <span className="text-blue-400">coding potential</span> with our online courses.</h1>
                <p className="text-md text-white font-bold text-wrap  text-left">Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.</p>
                <div className="flex flex-row justify-center items-center gap-x-5 ">
                    <motion.button whileHover={{ scale: 0.9 }} onClick={() => navigate("/Signup")} className="px-5 bg-yellow-400 py-[4.8px] rounded-md transition duration-500 flex flex-row text-center font-bold cursor-pointer">Try it Yourself <img className="ml-2 object-contain w-[30px] relative bottom-[2px]" src={arrow} alt="" /></motion.button>
                    <motion.button whileHover={{ scale: 0.9 }} onClick={() => navigate("/Signup")} className="px-5 text-white bg-gray-800 py-2 rounded-md transition duration-500 cursor-pointer">Learn More </motion.button>
                </div>
            </AnimatedSection>
            <AnimatedSection direction="left" delay={0.15} className="lg:w-[500px] w-11/12 h-[500px] px-2 py-1 border-2 bg-gray-800/20 backdrop-blur-lg border-white/20 flex flex-row justify-start items-center gap-x-2">
              <div className="w-[300px] h-[230px] rounded-full shadow-2xl bg-gradient-to-r from-[#ef4444] via-[#b45309] to-[#f59e0b] blur-2xl brightness-50 absolute">
              </div>
               <div className="code-font h-[330px] flex flex-col items-center text-gray-600 max-[500px]:hidden">
                <p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p><p>12</p><p>13</p><p>14</p>
               </div>
             <div className="code-font w-[310px] text-yellow-300 brightness-140 h-[330px] max-[500px]:h-[480px]">
               <Typewriter1></Typewriter1>
               </div>
            </AnimatedSection>
            </div>
        </div>
    )
}

export default Section2
