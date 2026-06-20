import { useNavigate } from "react-router-dom"
import girl from "../../../assets/Girl.png"
import Card1 from "../../../assets/Card1.png"
import Card2 from "../../../assets/Card2.png"
import Card3 from "../../../assets/Card3.png"
import AnimatedSection from "../../Common/AnimatedSection"
import { motion } from "framer-motion"



function Section5(){
     const navigate = useNavigate()
    return(
        <div className="bg-gradient-to-bl from-[#ffe4e6] to-[#ccfbf1] w-full  pb-10">
            
            <AnimatedSection className="w-10/12 py-10 mx-auto flex lg:flex-row flex-col justify-center lg:justify-evenly items-center">
                <h1 className="text-4xl font-bold text-black">Get the Skills you need for a <span className="text-blue-500">Job that is in demand</span></h1>
                <div className=" flex flex-col lg:items-start items-center justify-center gap-y-5 lg:ml-50 ">
                    <p className="text-md text-gray-400 text-wrap">The modern Study Notion App the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                      <button onClick={() => {
                        navigate("/Signup")
                    }} className="px-5 text-black bg-yellow-400 py-2 rounded-md hover:scale-90 transition duration-500 cursor-pointer">Learn More </button>
                </div>
            </AnimatedSection>
            <div className="w-11/12 mx-auto flex lg:flex-row flex-col gap-y-10 lg:justify-evenly justify-center items-center">
                <div className="w-[500px]  max-[400px]:hidden">
                    <ul className="list-none flex flex-col gap-y-10 justify-center items-center ">
                        <li >
                            <div className="flex flex-row sm:justify-between items-center w-[350px]">
                                   <div className="bg-white flex justify-center items-center rounded-md px-3 py-3 ">
                                <img  className="object-contain w-[20px]" src="https://studynotion-edtech.vercel.app/static/media/Logo1.73daf51e41d665299fc682bc3cb53878.svg" alt="" /></div>
                                <div className="flex flex-col items-start justify-center gap-x-2 ">
                                    <h1 className="text-black text-md font-bold">Leadership Skills</h1>
                                    <p>Fully commited to the success company</p>
                                </div>
                            </div>
                        </li>
                         <li>
                            <div className="flex flex-row sm:justify-between items-center w-[350px]">
                                <div className="bg-white flex justify-center items-center rounded-md px-3 py-3">
                                <img  className="object-contain w-[20px]" src="https://studynotion-edtech.vercel.app/static/media/Logo2.2d9e85de9e756cda89ffc4582338c939.svg" alt="" /></div>
                                <div className="flex flex-col items-start justify-center gap-x-2">
                                    <h1 className="text-black text-md font-bold">Leadership Skills</h1>
                                    <p>Fully commited to the success company</p>
                                </div>
                            </div>
                        </li>
                         <li>
                            <div className="flex flex-row sm:justify-between items-center w-[350px]">
                                <div className="bg-white flex justify-center items-center rounded-md px-3 py-3">
                                <img className="object-contain w-[20px]" src="https://studynotion-edtech.vercel.app/static/media/Logo3.0a56f78fead602f0d54c55ddcdf7e616.svg" alt="" />
                                </div>
                                <div className="flex flex-col items-start justify-center gap-x-2">
                                    <h1 className="text-black text-md font-bold">Leadership Skills</h1>
                                    <p>Fully commited to the success company</p>
                                </div>
                            </div>
                        </li>
                         <li>
                            <div className="flex flex-row sm:justify-between items-center w-[350px]">
                                <div className="bg-white flex justify-center items-center rounded-md px-3 py-3">
                                <img  className="object-contain w-[20px]" src="https://studynotion-edtech.vercel.app/static/media/Logo4.5da4c6e0c53e6745b25529891ef82458.svg" alt="" /></div>
                                <div className="flex flex-col items-start justify-center gap-x-2">
                                    <h1 className="text-black text-md font-bold">Leadership Skills</h1>
                                    <p>Fully commited to the success company</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="sm:w-[600px] w-10/12 flex justify-center items-center ">
                    <div className="lg:pt-30 sm:w-[500px] w-10/12 ">
                    <img className="shadow-[20px_20px_80px_2px_rgba(035,206,235,0.45)]   z-10" src={girl} alt="" />

                    <div className="bg-green-600 sm:w-[400px]  mx-auto py-2 sm:py-10 px-3 flex flex-row justify-evenly  items-center relative z-20 max-[650px]:hidden  bottom-15 ">
                      <h1 className="text-white text-sm sm:text-3xl font-bold">10</h1>
                      <h1 className="text-gray-400 text-sm sm:text-lg ">YEARS OF <br /> EXPERIENCE</h1>
                      <div className="bg-white h-[30px] w-[1px] "></div>
                       <h1 className="text-white text-sm sm:text-3xl font-bold">250</h1>
                      <h1 className="text-gray-400 text-sm  sm:text-lg">TYPES OF <br /> COURSES</h1>
                     </div>
                    </div>
                </div>

            </div>
            <div className=" w-10/12 mx-auto flex flex-col  items-center justify-center gap-y-5 mt-5">
                   <h1 className="text-4xl font-bold text-center">Your swiss knife for <span className="text-blue">learning any language</span></h1>
                   <p className="text-md text-gray-400 text-center">Using spin making learning multiple language easy. With 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
                   <div className="flex lg:flex-row flex-col gap-y-5 justify-center items-center">
                    <img className="object-contain w-[350px]" src={Card1} alt="" />
                    <img className="object-contain w-[350px]" src={Card2} alt="" />
                    <img className="object-contain w-[350px]" src={Card3} alt="" />
                   </div>
                   <button onClick={() => {
                        navigate("/Signup")
                    }} className="px-5 text-black bg-yellow-400 py-2 rounded-md hover:scale-90 transition duration-500 cursor-pointer">Learn More </button>
            </div>

        </div>
    )
}

export default Section5