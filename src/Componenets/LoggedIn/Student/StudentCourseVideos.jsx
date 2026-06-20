import TopBar from "../../Core/Home/TopBar"
import NavBar from "../../Core/Home/NavBar"
import Dashboard from "./SectionDashboard"
import SubsectionVideo from "./SubsectionVideo"
import { useState } from "react"
import { useParams } from "react-router-dom"
function card(){

    const {courseId} = useParams();
    const [activeSubsection , setActive] = useState("");
     const [ReviewPopup , setReviewPopup] = useState(false)
    return(
          <div className={` w-full bg-[rgb(3,1,29)] `}>
              <div className={`w-full flex justify-center items-center  `}>
            <NavBar></NavBar>
         </div>
             <TopBar></TopBar>

             <div className="min-h-screen pt-12 w-full flex flex-row  z-10 ">
                <div className="md:w-[250px] w-1/4">
                <Dashboard ReviewPopup={ReviewPopup} setReviewPopup={setReviewPopup} setActive={setActive}></Dashboard>
                </div>
                <div className={`flex-1 justify-center items-center  `}>
                  <SubsectionVideo ReviewPopup={ReviewPopup} setReviewPopup={setReviewPopup} activeSubsection={activeSubsection} courseId={courseId}></SubsectionVideo>
                </div>
                  </div>
                    </div>
    )
}

export default card