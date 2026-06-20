import setting from "../../../assets/settings.png"
import profile from "../../../assets/user.png"
import course from "../../../assets/book.png"
import enrolled from "../../../assets/enrolled.png"
import purchase from "../../../assets/purchase.png"
import wishlist from "../../../assets/wishlist.png"
import logout from "../../../assets/logout.png"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { removeAccount } from "../../../Redux/slices/AccountType"
import { removeToken } from "../../../Redux/slices/auth"
function Dashboard(){
          const dispatch = useDispatch()
   const navigate = useNavigate()
   const [selected , setSelected] = useState("profile")
   const activeClass =
  "bg-orange-600/20 border-l-4 border-yellow-400 text-yellow-600";

const baseClass =
  "w-full py-2 px-2 flex items-center gap-x-2";

function logoutHandler(){
    dispatch(removeToken())
    dispatch(removeAccount())
    navigate("/Login")
}
    return (
  
            
            <div className="md:w-[250px] w-full self-start min-h-screen  left-0  flex flex-col items-start  gap-y-1  py-6 bg-gray-800">
                <div className="w-full flex flex-col items-start  py-1 gap-y-2 text-[10px] sm:text-sm font-bold text-gray-500 border-b border-gray-600 pb-5 ">
                
      <NavLink
        to="/Student/Home/Dashboard/MyProfile"
        className={({ isActive }) =>
          `w-full block ${isActive ? activeClass : ""}`
        }
      >
        <div className={baseClass}>
          <img className="w-[15px] invert object-cover" src={profile} alt="profile" />
          <h1>My Profile</h1>
        </div>
      </NavLink>

      {/* Enrolled Courses */}
      <NavLink
        to="/Student/Dashboard/EnrolledCourses"
        className={({ isActive }) =>
          `w-full block ${isActive ? activeClass : ""}`
        }
      >
        <div className={baseClass}>
          <img className="w-[15px] invert object-cover" src={enrolled} alt="enrolled" />
          <h1>Enrolled Courses</h1>
        </div>
      </NavLink>

      {/* Wishlist */}
      <NavLink
        to="/Student/Dashboard/Wishlist"
        className={({ isActive }) =>
          `w-full block ${isActive ? activeClass : ""}`
        }
      >
        <div className={baseClass}>
          <img className="w-[15px] invert object-cover" src={wishlist} alt="wishlist" />
          <h1>Wishlist</h1>
        </div>
      </NavLink>

      {/* Purchase History */}
      <NavLink
        to="/Student/Home/Dashboard/PurchaseHistory"
        className={({ isActive }) =>
          `w-full block ${isActive ? activeClass : ""}`
        }
      >
        <div className={baseClass}>
          <img className="w-[15px] invert object-cover" src={purchase} alt="purchase" />
          <h1>Purchase History</h1>
        </div>
      </NavLink>

      {/* Courses */}
      {/* <NavLink
        to="/Student/Home/Dashboard/Courses"
        className={({ isActive }) =>
          `w-full block ${isActive ? activeClass : ""}`
        }
      >
        <div className={baseClass}>
          <img className="w-[15px] invert object-cover" src={course} alt="course" />
          <h1>Courses</h1>
        </div>
      </NavLink> */}


                </div>

                <div className="px-2 flex flex-col gap-y-3 text-gray-500 text-[10px] sm:text-sm font-bold mt-5">
      <NavLink
        to="/Student/Home/Dashboard/Settings"
        className={({ isActive }) =>
          `w-full block ${isActive ? activeClass : ""}`
        }
      >
        <div className={baseClass}>
          <img className="w-[15px] invert object-cover" src={setting} alt="settings" />
          <h1>Settings</h1>
        </div>
      </NavLink>
                     <div  className="flex cursor-pointer justify-evenly gap-x-2 items-center  py-2">
                            <img className="sm:w-[15px] w-[10px] object-contain invert" src={logout} alt="" />
                        <button onClick={logoutHandler} className=" cursor-pointer hover:brightness-90">Log out</button></div>
                </div>

            </div>
        

       
     
    )
}

export default Dashboard