import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { GetCourse, purchaseCourse } from "../../../services/ApiInstance";
import CourseCard from "./CourseCard"
import { removeCourse } from "../../../Redux/slices/Cart";
import { toast } from "react-toastify";
import AnimatedSection from "../../Common/AnimatedSection";
import { motion } from "framer-motion";

function Card(){
   const [totalCourses , setCourses] = useState([])
  const AllCourses  = useSelector((state) => (state.Cart.Courses))
   const dispatch = useDispatch()

  const [Checkout , setCheckout] = useState(false);
  const [loading , setLoading] = useState(false)
  const [Price , setPrice] = useState(0);

  async function CoursePurchase() {
     if(loading) return;

     setLoading(true);
    try{
        for(const course of AllCourses){
            const Data = { courseId: course };
            const res = await purchaseCourse(Data);
            if(!res.data.success){
                toast.error(res.data.message);
                return;
            }
            dispatch(removeCourse(course));
        }
        toast.success("Courses enrolled successfully!");
        setCheckout(false);
        TotalCourses();
    }
    catch(error){
        console.log(error)
         const errorMessage =
 error?.response?.data?.message || "Something went wrong!";           
toast.error(errorMessage);
    }
    finally{
        setLoading(false)
    }
  }

  async function TotalCourses() {
  try {
    const result = [];

    for (const courseId of AllCourses) {
      const res = await GetCourse({ courseId });
      if (res.data.success) {
        result.push(res.data.Courses);
      }
    }

    setCourses(result);
  } catch (error) {
    console.log(error);
  }
}

function PriceCalculator(courses) {
    let temp = 0;
    courses.forEach((course) => {
      temp += course.price || 0;
    });
    setPrice(temp);
}

useEffect(() => {
    if(AllCourses.length > 0)
    TotalCourses()
    else {
      setCourses([]);
      setPrice(0);
    }
} , [AllCourses])

useEffect(() => {
    if(totalCourses.length > 0){
        PriceCalculator(totalCourses)
    }
} , [totalCourses])

    return(
        <div>
            <div className=" justify-between items-center  w-full px-9 mx-auto">
            <AnimatedSection>
            <div className="flex flex-col  py-2 justify-evenly  gap-y-2">
                <p className="text-gray-600 text-sm">Home / Dashboard / <span className="text-yellow-400 text-md">{`${Checkout===true?'Checkout':'Wishlist'} `}</span></p>
            </div>
            <div className="flex justify-start px-2 text-white text-xl font-bold">
                <h1>{`${Checkout===true?'Checkout':'My Wishlist'} `}</h1>
            </div>
            </AnimatedSection>

            <div className="w-11/12 mx-auto flex flex-col justify-evenly gap-y-2 mt-5">
                <p className="text-xs text-gray-300 font-bold" >{AllCourses.length} Courses in Wishlist</p>
                 < hr className="text-white" />
                 <div className="flex justify-between items-start flex-col lg:flex-row gap-y-4">
                 <div className="flex flex-col justify-evenly gap-y-2 mt-2 flex-1">
                       { AllCourses.length>0?
                        totalCourses.map((course) => (
                            <motion.div
                              key={course._id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4 }}
                            >
                              <CourseCard course={course}></CourseCard>
                            </motion.div>
                        ))
                       :
                       <AnimatedSection>
                       <div className="flex items-center justify-center py-10">
                         <h1 className="text-xl font-bold text-white">No Courses in Wishlist</h1>
                       </div>
                       </AnimatedSection>
}
                 </div>
                 { Checkout===true?
                 <AnimatedSection direction="left" className="flex flex-col rounded-md bg-gray-900 px-3 py-3 lg:w-[280px] w-full">
                  <h1 className="text-md font-bold text-white">Enrollment Details</h1>
                  <p className="text-gray-500 text-left text-xs">Review your courses and confirm enrollment.</p>
                   <div className="px-2 my-5 py-1 w-11/12 mx-auto rounded-md border border-gray-400 flex flex-col justify-evenly gap-y-3">
                    <div className="flex text-gray-400 text-sm justify-between">
                        <h1>Total:</h1>
                        <h1 >Rs. {Price}</h1>
                    </div>
                    <p className="text-gray-500 text-[10px] italic">Payment gateway integration is skipped for now. Click below to enroll directly.</p>
                    <button onClick={CoursePurchase} disabled={loading || AllCourses.length === 0} className="bg-yellow-400 cursor-pointer w-10/12 hover:scale-95 rounded-md self-center lg:px-5 py-1 text-xs font-bold text-black disabled:opacity-50 transition duration-300">{`${loading === true?'Enrolling....':`Enroll for Rs. ${Price}`} `}</button>
                   </div>
                 </AnimatedSection>        
                 :<AnimatedSection direction="left" className="bg-gray-900 px-2 py-5 flex flex-col md:w-[200px] w-full items-start rounded-md justify-evenly gap-y-2">
                    <h1 className="text-gray-600 text-sm font-bold">Total:</h1>
                    <h1 className="text-yellow-400 text-lg font-bold">Rs. {Price}</h1>
                    <button onClick={() => setCheckout(true)} disabled={AllCourses.length === 0} className="bg-yellow-400 cursor-pointer w-10/12 hover:scale-95 rounded-md self-center lg:px-5 py-1 text-xs font-bold text-black disabled:opacity-50 transition duration-300">Proceed to Checkout</button>
                 </AnimatedSection>
}
                 </div>

            </div>
        </div>
        </div>
    )
}

export default Card
