import { useEffect, useState } from "react"
import Card from "./Card"
import { useNavigate } from "react-router-dom"
import arrow from "../../../assets/arrow.png"
import { getAllCategories, getAllCourses } from "../../../services/ApiInstance"
import AnimatedSection from "../../Common/AnimatedSection"

function Section4 (){
    const [tag , setTag] = useState("free");
    const [Id , setId] = useState(null);
    const [courses , setCourses] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
      async function fetchCourses() {
        try {
          const result = await getAllCourses()
          if (result.data.success) {
            setCourses(result.data.allCourses || [])
          }
        } catch (error) {
          console.log(error)
        }
      }
      fetchCourses()
    }, [])

    const filteredCourses = courses.filter((course) => {
      if (tag === "free") return course.price === 0
      if (tag === "popular") return (course.studentsEnrolled?.length || 0) >= 1
      if (tag === "newToCoding") return course.Tags?.toLowerCase().includes("beginner") || course.Tags?.toLowerCase().includes("coding")
      if (tag === "skillsPaths") return course.Tags?.toLowerCase().includes("skill")
      if (tag === "careerPaths") return course.Tags?.toLowerCase().includes("career")
      return true
    }).slice(0, 6)

    useEffect(() => {
      if (filteredCourses.length > 0) {
        setId(filteredCourses[0]._id)
      }
    }, [tag, courses])

    async function exploreCatalogue() {
      try {
        const result = await getAllCategories()
        if (result.data.success && result.data.response?.length > 0) {
          navigate(`/Catalogue/${result.data.response[0].name}`)
        } else {
          navigate("/Signup")
        }
      } catch {
        navigate("/Signup")
      }
    }

    return(
        <div className="w-full flex flex-col items-center bg-[rgb(3,1,29)] pb-5">
          <AnimatedSection className="max-w-[500px] mx-auto flex flex-col gap-y-5 mb-10 justify-center items-center">
            <h1 className="sm:text-4xl text-xl text-white font-bold">Unlock the <span className="text-blue-500">Power of Course</span></h1>
            <p className="text-md font-bold text-gray-400 text-center">Learn to build anything you can imagine</p>
          </AnimatedSection>
          <div className="w-full flex flex-col gap-y-5">

           <AnimatedSection delay={0.1}>
           <div className="flex flex-row px-2 py-1 border-b-gray-400 border-1 bg-gray-900 rounded-4xl w-fit mx-auto justify-evenly max-[700px]:hidden ">
            <button onClick={() => setTag("free")} className={`px-5 cursor-pointer py-1 text-gray-500 text-lg hover:rounded-4xl hover:bg-black transition duration-300 ${tag==='free'?"rounded-4xl bg-black text-orange-400":""} `}>Free</button>
            <button onClick={() => setTag("newToCoding")} className={`px-5 cursor-pointer py-1 text-gray-500 text-lg hover:rounded-4xl hover:bg-black transition duration-300 ${tag==='newToCoding'?"rounded-4xl bg-black text-orange-400":""}`}>New to Coding</button>
            <button onClick={() => setTag("popular")} className={`px-5 cursor-pointer py-1 text-gray-500 text-lg hover:rounded-4xl hover:bg-black transition duration-300 ${tag==='popular'?"rounded-4xl bg-black text-orange-400":""}`}>Most Popular</button>
            <button onClick={() => setTag("skillsPaths")} className={`px-5 cursor-pointer py-1 text-gray-500 text-lg hover:rounded-4xl hover:bg-black transition duration-300 ${tag==='skillsPaths'?"rounded-4xl bg-black text-orange-400":""}`}>Skills Paths</button>
            <button onClick={() => setTag("careerPaths")} className={`px-5 cursor-pointer py-1 text-gray-500 text-lg hover:rounded-4xl hover:bg-black transition duration-300 ${tag==='careerPaths'?"rounded-4xl bg-black text-orange-400":""}`}>Career Paths</button>
           </div>
           </AnimatedSection>

           <div className="w-full z-20 mx-auto gap-x-5 gap-y-10 flex flex-row justify-evenly items-center px-5 mt-5 flex-wrap">
             {filteredCourses.length > 0 ? (
                filteredCourses.map((course, index) => (
                    <Card
                      key={course._id}
                      setId={setId}
                      Data={{
                        id: course._id,
                        title: course.courseName,
                        description: course.courseDescription,
                        students: course.studentsEnrolled?.length || 0,
                        price: course.price,
                      }}
                      Id={Id}
                      index={index}
                    />
                ))
             ) : (
               <AnimatedSection>
                 <p className="text-gray-400 text-center py-10">No courses in this category yet. Check back soon!</p>
               </AnimatedSection>
             )}
          </div>
           <AnimatedSection delay={0.2} className="w-11/12 mx-auto flex justify-center items-center gap-x-5 mt-5"> 
                <button onClick={exploreCatalogue} className="px-5 bg-yellow-400 py-[4.8px] rounded-md hover:scale-90 transition duration-500 flex flex-row text-center font-bold cursor-pointer">Explore Full Catalogue<img className="ml-2 object-contain w-[30px] relative bottom-[2px]" src={arrow} alt="" /></button>
                 <button onClick={() => navigate("/Signup")} className="px-5 text-white bg-gray-800 py-2 rounded-md hover:scale-90 transition duration-500 cursor-pointer">Learn More </button>
           </AnimatedSection>

    </div>

        </div>
    )
}

export default Section4
