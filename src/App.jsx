
import Home from "./Pages/Home"
import FloatingStickers from "./Componenets/Common/FloatingStickers"
import BackToTop from "./Componenets/Common/BackToTop"
import SpiderLoader from "./Componenets/Common/SpiderLoader"
import './App.css'
import { Route , Routes } from 'react-router-dom'
import Contact from "./Pages/Contact"
import About from "./Pages/About"
import NotFound from "./Componenets/Core/Home/NotFound"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import SIgnUp from "./Pages/SIgnUp"
import RSignUp from "./Pages/RSignUp"
import OTP from "./Componenets/Core/RSignUp/OTP"
import ResetPassword from "./Componenets/Core/SignUp/ResetPassword"
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Logged from "./Componenets/LoggedIn/LoggedSample"
import ProtectedRoute from "./services/ProtectedRoute"
import ChangePassword from "./Componenets/Core/SignUp/ChangePassword"
import { useSelector } from "react-redux"
import Student_Home from "./Componenets/LoggedIn/Student/Student_Home"
import Student_About from "./Componenets/LoggedIn/Student/Student_About"
import Student_Contact from "./Componenets/LoggedIn/Student/Student_Contact"
import PublicRoute from "./services/PublicRoute"
import ProfileEdit from "./Componenets/LoggedIn/Student/ProfileEdit"
import ProtectedRoute1 from "./services/InstructorProtectedRoute"
import Instructor_Home from "./Componenets/LoggedIn/Instructor/Instructor_Home"
import Instructor_About from "./Componenets/LoggedIn/Instructor/Instructor_About"
import Instructor_Contact from "./Componenets/LoggedIn/Instructor/Instructor_Contact"
import Instructor_Course from "./Componenets/LoggedIn/Instructor/Instructor_Course"
import InstructorProfileEdit from "./Componenets/LoggedIn/Instructor/EditProfileCard"
import CatalogueCard from "./Pages/Catalogue"
import CourseCard from "./Componenets/Core/Catalogue/CourseSection"
import Student_Catalogue from "./Componenets/LoggedIn/Student/Student_Catalogue"
import Student_SingleCourse from "./Componenets/LoggedIn/Student/Student_SingleCourse"
import Student_Cart from "./Componenets/LoggedIn/Student/Student_Cart"
import Student_Enrolled from "./Componenets/LoggedIn/Student/Student_Enrolled"
import StudentCourseVideos from "./Componenets/LoggedIn/Student/StudentCourseVideos"
import Student_PurchaseHistoryPage from "./Componenets/LoggedIn/Student/Student_PurchaseHistoryPage"
import Student_SettingsPage from "./Componenets/LoggedIn/Student/Student_SettingsPage"
import Instructor_SettingsPage from "./Componenets/LoggedIn/Instructor/Instructor_SettingsPage"
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}




function App() {

 return(
  <div className="" style={{ position: "relative" }}>
  <SpiderLoader />
  <FloatingStickers />
  <BackToTop />
  <ScrollToTop />

   <Routes>
    <Route path='/' element={<PublicRoute><Home></Home></PublicRoute>} ></Route>
    <Route path='/Contact' element={<PublicRoute><Contact></Contact></PublicRoute>} ></Route>
    <Route path='/About' element={<PublicRoute><About></About></PublicRoute>} ></Route>
    <Route path="/Login" element={<PublicRoute><SIgnUp></SIgnUp></PublicRoute>}></Route>
    <Route path="/Signup" element={<PublicRoute><RSignUp></RSignUp></PublicRoute>}></Route>
    <Route path="/send-otp" element={<PublicRoute><OTP></OTP></PublicRoute>}></Route>
    <Route path="/reset-password" element={<PublicRoute><ResetPassword></ResetPassword></PublicRoute>}></Route>
     <Route path="/reset-Password/:token" element={<PublicRoute><ChangePassword></ChangePassword></PublicRoute>}></Route>
    <Route path="/Catalogue/:category" element={<PublicRoute><CatalogueCard></CatalogueCard></PublicRoute>}></Route>
    <Route path="/Catalogue/Course/:courseId" element={<PublicRoute><CourseCard></CourseCard></PublicRoute>}></Route>

    {/* Routes For Students */}
    <Route element={<ProtectedRoute />}>
    <Route path={`/Student/Home/Dashboard/MyProfile`} element={<Student_Home></Student_Home>} />
    </Route>
    <Route element={<ProtectedRoute />}>
    <Route path={`/Student/Home/Dashboard/EditProfile`} element={<ProfileEdit></ProfileEdit>} />
    </Route>
    <Route element={<ProtectedRoute />}>
  <Route path={`/Student/About`} element={<Student_About></Student_About>} />
</Route>
   <Route element={<ProtectedRoute />}>
  <Route path={`/Student/Contact`} element={<Student_Contact></Student_Contact>} />
</Route>
 <Route element={<ProtectedRoute />}>
  <Route path={`/Student/Catalogue/:category`} element={<Student_Catalogue></Student_Catalogue>} />
</Route>
<Route element={<ProtectedRoute />}>
  <Route path={`/Student/Catalogue/Course/:courseId`} element={<Student_SingleCourse></Student_SingleCourse>} />
</Route>
<Route element={<ProtectedRoute />}>
  <Route path={`/Student/Dashboard/Wishlist`} element={<Student_Cart></Student_Cart>} />
</Route>
<Route element={<ProtectedRoute />}>
  <Route path={`/Student/Dashboard/EnrolledCourses`} element={<Student_Enrolled></Student_Enrolled>} />
</Route>
<Route element={<ProtectedRoute />}>
  <Route path={`/Student/Course/details/:courseId`} element={<StudentCourseVideos></StudentCourseVideos>} />
</Route>
<Route element={<ProtectedRoute />}>
  <Route path={`/Student/Home/Dashboard/PurchaseHistory`} element={<Student_PurchaseHistoryPage />} />
</Route>
<Route element={<ProtectedRoute />}>
  <Route path={`/Student/Home/Dashboard/Settings`} element={<Student_SettingsPage />} />
</Route>

    {/* Routes for Instructors */}

    <Route element={<ProtectedRoute1 />}>
    <Route path={`/Instructor/Home/Dashboard/MyProfile`} element={<Instructor_Home></Instructor_Home>} />
    </Route>
    <Route element={<ProtectedRoute1 />}>
  <Route path={`/Instructor/About`} element={<Instructor_About></Instructor_About>} />
</Route>
   <Route element={<ProtectedRoute1 />}>
  <Route path={`/Instructor/Contact`} element={<Instructor_Contact></Instructor_Contact>} />
</Route>
 <Route element={<ProtectedRoute1 />}>
    <Route path={`/Instructor/Home/Dashboard/EditProfile`} element={<InstructorProfileEdit></InstructorProfileEdit>} />
    </Route>
 <Route element={<ProtectedRoute1 />}>
    <Route path={`/Instructor/Home/Dashboard/MyCourses`} element={<Instructor_Course></Instructor_Course>} />
    </Route>
 <Route element={<ProtectedRoute1 />}>
    <Route path={`/Instructor/Home/Dashboard/Settings`} element={<Instructor_SettingsPage />} />
    </Route>

    <Route path="/Catalogue/NotFound" element={<NotFound></NotFound>} ></Route>
    <Route path="*" element={<NotFound></NotFound>} ></Route>
    
   </Routes>

   <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
  </div>
 )
     
}

export default App
