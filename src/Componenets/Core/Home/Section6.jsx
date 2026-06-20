import instructor from "../../../assets/Instructor.png"
import arrow from "../../../assets/arrow.png"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAllRatings } from "../../../services/ApiInstance"
import AnimatedSection from "../../Common/AnimatedSection"
import FakeReviewsCarousel from "./FakeReviewsCarousel"
import { motion } from "framer-motion"

function Section6(){
 const navigate = useNavigate()
 const [reviews, setReviews] = useState([])

 useEffect(() => {
  async function fetchReviews() {
    try {
      const result = await getAllRatings()
      if (result.data.success) {
        setReviews(result.data.allRatings || [])
      }
    } catch (error) {
      console.log(error)
    }
  }
  fetchReviews()
 }, [])

    return(
        <div className="w-full bg-[rgb(3,1,29)] pt-20 pb-10 overflow-hidden">
            <div className="w-10/12 mx-auto flex lg:flex-row flex-col gap-y-5 justify-evenly items-center gap-x-5">
                <AnimatedSection direction="left" className="lg:w-[500px] w-10/12">
                    <img className="shadow-[-12px_-12px_0px_0px_rgba(255,255,255,1)] hover:scale-[1.02] transition duration-500" src={instructor} alt="Become an instructor" />
                </AnimatedSection>
                <AnimatedSection direction="right" delay={0.15} className="flex flex-col justify-center items-start gap-y-5 lg:w-[400px] w-10/12">
                    <h1 className="text-4xl font-bold self-start text-white">Become an <span className="text-blue-500">Instructor</span></h1>
                    <p className="text-gray-400 text-md font-bold">Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                    <button
                      onClick={() => navigate("/Signup")}
                      className="px-5 bg-yellow-400 py-[4.8px] rounded-md hover:scale-90 transition duration-500 flex flex-row text-center font-bold cursor-pointer"
                    >
                      Start teaching Today
                      <img className="ml-2 object-contain w-[30px] relative bottom-[2px]" src={arrow} alt="" />
                    </button>                    
                </AnimatedSection>
            </div>

            {/* Reviews Carousel Section */}
            <div className="mt-20 w-full">
                <AnimatedSection>
                  <div className="text-center mb-3">
                    <h1 className="text-4xl text-white font-bold mb-2">What Our Learners Say</h1>
                    <p className="text-gray-400 text-sm">Join thousands of students who transformed their careers with StudyNotion</p>
                  </div>
                  {/* Rating summary bar */}
                  <div className="flex justify-center items-center gap-x-6 mb-10 flex-wrap gap-y-2">
                    {["4.9 ⭐ Curriculum", "4.8 ⭐ Instructors", "4.7 ⭐ Value", "4.9 ⭐ Support"].map((item) => (
                      <motion.span
                        key={item}
                        whileHover={{ scale: 1.05 }}
                        className="text-xs text-yellow-300 font-semibold bg-yellow-400/10 border border-yellow-400/20 rounded-full px-4 py-1.5"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </AnimatedSection>

                <FakeReviewsCarousel realReviews={reviews} />
            </div>
        </div>
    )
}

export default Section6
